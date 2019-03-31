import { Injectable, OnDestroy, Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { colsMap, colsMapBig, colsMapSml } from '../config/data';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators';
import { DashboardCardsService } from './dashboard-cards.service';
import { DashboardCard } from '../../dashboard/dashboard/dashboard-card';
import { TestComponent } from '../../dashboard/dashboard/test/test.component';
import { BarChartComponent } from '../../dashboard/dashboard/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../dashboard/dashboard/pie-chart/pie-chart.component';
import { NumberCardComponent } from '../../dashboard/dashboard/number-card/number-card.component';
import { LinearGaugeComponent } from '../../dashboard/dashboard/linear-gauge/linear-gauge.component';
import { DataBusService } from './data-bus.service';
import { UidService } from './uid.service';

@Injectable({
  providedIn: 'root'
})
export class SettingDashboardService implements OnDestroy {
  cols$: ReplaySubject<any> = new ReplaySubject(null);
  listen$: Subscription;
  save$: Subscription;
  reset$: Subscription;
  cols: Observable<number>;
  cols_big: Observable<number>;
  cols_sml: Observable<number>;

  constructor(
    private observableMedia: ObservableMedia,
    private cardsService: DashboardCardsService,
    private dataBus: DataBusService,
    private uid: UidService
  ) {
    /* Grid column map */
    const cols_map = colsMap;
    /* Big card column span map */
    const cols_map_big = colsMapBig;
    /* Small card column span map */
    const cols_map_sml = colsMapSml;
    let start_cols: number;
    let start_cols_big: number;
    let start_cols_sml: number;
    cols_map.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols = cols;
      }
    });
    cols_map_big.forEach((cols_big, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols_big = cols_big;
      }
    });
    cols_map_sml.forEach((cols_sml, mqAliast) => {
      if (this.observableMedia.isActive(mqAliast)) {
        start_cols_sml = cols_sml;
      }
    });
    this.cols = this.observableMedia.asObservable().pipe(
      first(),
      map(change => cols_map.get(change.mqAlias)),
      startWith(start_cols)
    );
    this.cols_big = this.observableMedia.asObservable().pipe(
      first(),
      map(change => cols_map_big.get(change.mqAlias)),
      startWith(start_cols_big)
    );
    this.cols_sml = this.observableMedia.asObservable().pipe(
      first(),
      map(change => cols_map_sml.get(change.mqAlias)),
      startWith(start_cols_sml)
    );
    if (!this.listen$) {
      this.listen$ = this.dataBus.submenuE$.subscribe(val =>
        this.createCard(val)
      );
    }
    if (!this.save$) {
      this.save$ = this.dataBus.saveDash$.subscribe(() =>
        this.cardsService.saveDash()
      );
    }
    if (!this.reset$) {
      this.reset$ = this.dataBus.resetDash$.subscribe(() =>
        this.cardsService.resetCards()
      );
    }
  }

  ngOnDestroy() {
    this.listen$.unsubscribe();
    this.save$.unsubscribe();
    this.reset$.unsubscribe();
  }

  createCards(): void {
    const dash = JSON.parse(localStorage.getItem('dash'));
    const widgets = dash
      ? dash.map(widget => {
          const { name, uid, cols, rows } = widget;
          return new DashboardCard(
            {
              name: { key: DashboardCard.metadata.NAME, value: name },
              routerLink: {
                key: DashboardCard.metadata.ROUTERLINK,
                value: '/dashboard/users'
              },
              iconClass: {
                key: DashboardCard.metadata.ICONCLASS,
                value: 'fa-users'
              },
              cols: {
                key: DashboardCard.metadata.COLS,
                value: cols === 4 ? this.cols_big : this.cols_sml
              },
              rows: {
                key: DashboardCard.metadata.ROWS,
                value: rows === 4 ? this.cols_big : this.cols_sml
              },
              color: { key: DashboardCard.metadata.COLOR, value: 'blue' },
              uid: { key: DashboardCard.metadata.UID, value: uid }
            },
            this.getComponent(name)
          );
        })
      : [];
    widgets.length > 0
      ? this.cardsService.addCard(widgets)
      : console.log('No saved dashboard');
  }

  getComponent(name: string) {
    switch (name) {
      case 'Big gauge':
        return TestComponent;
        break;
      case 'Gauge':
        return PieChartComponent;
        break;
      case 'Number':
        return NumberCardComponent;
        break;
      case 'Bar':
        return BarChartComponent;
        break;
      case 'Linear gauge':
        return LinearGaugeComponent;
        break;
      default:
        break;
    }
  }

  createCard(card: string): void {
    this.cardsService.addCard(this.selectCard(card));
  }

  saveDash(): void {
    this.cardsService.saveDash();
  }

  selectCard(value: string): DashboardCard {
    const valF = value.toLowerCase();
    switch (valF) {
      case 'big gauge':
        return new DashboardCard(
          {
            name: {
              key: DashboardCard.metadata.NAME,
              value: 'Big gauge'
            },
            routerLink: {
              key: DashboardCard.metadata.ROUTERLINK,
              value: '/dashboard/users'
            },
            iconClass: {
              key: DashboardCard.metadata.ICONCLASS,
              value: 'fa-users'
            },
            cols: {
              key: DashboardCard.metadata.COLS,
              value: this.cols_big
            },
            rows: {
              key: DashboardCard.metadata.ROWS,
              value: this.cols_big
            },
            color: {
              key: DashboardCard.metadata.COLOR,
              value: 'blue'
            },
            uid: {
              key: DashboardCard.metadata.UID,
              value: this.uid.guid()
            }
          },
          TestComponent /* Reference to the component we'd like to spawn */
        );
      case 'gauge':
        return new DashboardCard(
          {
            name: { key: DashboardCard.metadata.NAME, value: 'Gauge' },
            routerLink: {
              key: DashboardCard.metadata.ROUTERLINK,
              value: '/dashboard/users'
            },
            iconClass: {
              key: DashboardCard.metadata.ICONCLASS,
              value: 'fa-users'
            },
            cols: { key: DashboardCard.metadata.COLS, value: this.cols_sml },
            rows: { key: DashboardCard.metadata.ROWS, value: this.cols_sml },
            color: { key: DashboardCard.metadata.COLOR, value: 'blue' },
            uid: {
              key: DashboardCard.metadata.UID,
              value: this.uid.guid()
            }
          },
          PieChartComponent
        );
      case 'bar':
        return new DashboardCard(
          {
            name: { key: DashboardCard.metadata.NAME, value: 'Bar' },
            routerLink: {
              key: DashboardCard.metadata.ROUTERLINK,
              value: '/dashboard/users'
            },
            iconClass: {
              key: DashboardCard.metadata.ICONCLASS,
              value: 'fa-users'
            },
            cols: { key: DashboardCard.metadata.COLS, value: this.cols_big },
            rows: { key: DashboardCard.metadata.ROWS, value: this.cols_sml },
            color: { key: DashboardCard.metadata.COLOR, value: 'blue' },
            uid: {
              key: DashboardCard.metadata.UID,
              value: this.uid.guid()
            }
          },
          BarChartComponent
        );
      case 'linear gauge':
        return new DashboardCard(
          {
            name: {
              key: DashboardCard.metadata.NAME,
              value: 'Linear gauge'
            },
            routerLink: {
              key: DashboardCard.metadata.ROUTERLINK,
              value: '/dashboard/users'
            },
            iconClass: {
              key: DashboardCard.metadata.ICONCLASS,
              value: 'fa-users'
            },
            cols: {
              key: DashboardCard.metadata.COLS,
              value: this.cols_sml
            },
            rows: {
              key: DashboardCard.metadata.ROWS,
              value: this.cols_sml
            },
            color: {
              key: DashboardCard.metadata.COLOR,
              value: 'blue'
            },
            uid: {
              key: DashboardCard.metadata.UID,
              value: this.uid.guid()
            }
          },
          LinearGaugeComponent
        );
      case 'number':
        return new DashboardCard(
          {
            name: {
              key: DashboardCard.metadata.NAME,
              value: 'Number'
            },
            routerLink: {
              key: DashboardCard.metadata.ROUTERLINK,
              value: '/dashboard/users'
            },
            iconClass: {
              key: DashboardCard.metadata.ICONCLASS,
              value: 'fa-users'
            },
            cols: {
              key: DashboardCard.metadata.COLS,
              value: this.cols_sml
            },
            rows: {
              key: DashboardCard.metadata.ROWS,
              value: this.cols_sml
            },
            color: {
              key: DashboardCard.metadata.COLOR,
              value: 'blue'
            },
            uid: {
              key: DashboardCard.metadata.UID,
              value: this.uid.guid()
            }
          },
          NumberCardComponent
        );

      default:
        break;
    }
  }
}
