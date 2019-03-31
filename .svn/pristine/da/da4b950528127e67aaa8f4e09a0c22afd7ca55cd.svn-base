import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractDashboardCard } from '../abstract-dashboard-card';
import { DashboardCard } from '../dashboard-card';
import { DashboardCardsService } from '../../../shared/services/dashboard-cards.service';
import { SocketCommService } from 'projects/socket-comm/src/public_api';
import { switchMap, skipWhile, skipUntil, tap } from 'rxjs/operators';
import { DialogComponent } from './dialog/dialog.component';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  providers: [SocketCommService]
})
export class PieChartComponent extends AbstractDashboardCard
  implements OnInit, OnDestroy {
  data;
  showRBtn = false;
  dialogSubs: Subscription;
  kpi = '';
  nedn = '';

  constructor(
    private injector: Injector,
    private dashS: DashboardCardsService,
    private socketComm: SocketCommService,
    public dialog: MatDialog,
    private http: HttpCallService
  ) {
    super(
      injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
      injector.get(DashboardCard.metadata.COLOR),
      injector.get(DashboardCard.metadata.UID)
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.dialogSubs) {
      this.dialogSubs.unsubscribe();
    }
  }

  close() {
    this.dashS.removeCard(this.uid);
  }

  mouseenterFn() {
    this.showRBtn = true;
  }

  mouseleaveFn() {
    this.showRBtn = false;
  }

  openDialog(): void {
    const data = {
      maxWidth: '100vh',
      width: '100vh',
      maxHeight: '100vh',
      height: 'auto',
      data: {}
    };
    let selNedn = '';
    const dialogRef = this.dialog.open(DialogComponent, data);
    this.dialogSubs = dialogRef
      .afterClosed()
      .pipe(
        skipWhile((val: Selection) => !val),
        switchMap((selection: Selection) => {
          this.kpi = selection.kpi;
          this.nedn = selection.nedn;
          selNedn = `DC=ims.mnc020.mcc334.3gppnetwork.org,g3SubNetwork=Mexico,g3ManagedElement=${
            selection.nedn
          }`;
          const endpoint = 'http://localhost:4000/subscribe';
          const params = { formula: selection.kpi, nedn: selNedn };
          return this.http.getRequest(endpoint, params);
        }),
        tap((val: Array<any>) => {
          if (val.length > 0) {
            this.setData(val[0]);
          } else {
            this.data = [{ time: 'No data', value: 0, name: '' }];
          }
        }),
        switchMap(_ => this.socketComm.connect('http://localhost:4001')),
        skipWhile(val => !val),
        switchMap(_ => {
          const listenTo = `${this.kpi}${selNedn}`;
          // On socket message
          return this.socketComm.onData(listenTo);
        }),
        tap(res => this.setData(res))
      )
      .subscribe(res => console.log('actual data', this.data));
  }

  setData(val): void {
    const { name, value, date, nedn } = val;
    const vStr = value.toString();
    const fValue = Number(vStr.slice(0, vStr.indexOf('.') + 2));
    const moment = new Date(date);
    const obj = {
      time: moment.toTimeString().slice(0, 5),
      value: fValue,
      name: name,
      nedn: nedn
    };
    this.data = [obj];
  }
}

export interface Selection {
  nedn: string;
  kpi: string;
}
