import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractDashboardCard } from '../abstract-dashboard-card';
import { DashboardCard } from '../dashboard-card';
import { DashboardCardsService } from '../../../shared/services/dashboard-cards.service';
import { BarDialogComponent } from './dialog/bar-dialog.component';
import { Subscription } from 'rxjs';
import { skipWhile, switchMap, tap } from 'rxjs/operators';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { SocketCommService } from 'projects/socket-comm/src/public_api';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers: [SocketCommService]
})
export class BarChartComponent extends AbstractDashboardCard
  implements OnInit, OnDestroy {
  data2;
  showRBtn = false;
  dialogSubs: Subscription;
  kpi = '';
  nedn = '';

  constructor(
    private injector: Injector,
    private dashS: DashboardCardsService,
    public dialog: MatDialog,
    private socketComm: SocketCommService,
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
    const dialogRef = this.dialog.open(BarDialogComponent, data);
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
          const endpoint = 'http://localhost:4000/nednDayData';
          const params = {
            kpi: selection.kpi,
            nedn: selNedn
          };
          return this.http.getRequest(endpoint, params);
        }),
        tap(res => this.setData(res)),
        switchMap(_ => this.socketComm.connect('http://localhost:4001')),
        skipWhile(val => !val),
        switchMap(_ => {
          const listenTo = `${this.kpi}${selNedn}`;
          // On socket message
          return this.socketComm.onData(listenTo);
        }),
        skipWhile(val => !val),
        tap(res => this.updateData(res))
      )
      .subscribe(res => {
        console.log('res', res);
      });
  }

  setData(res): void {
    const keys = Object.keys(res['data']);
    const bData = keys.map(hour => {
      const val = res['data'][hour];
      return {
        name: hour,
        value: val !== '' ? val : ''
      };
    });
    this.data2 = [{ name: res.day.slice(0, 10), series: bData }];
  }
  // ** Must work with local date (problem when the server has new day info around 19.00 local)
  // ** Must check new day update
  updateData(update): void {
    const { name, value, date, nedn } = update;
    const realTime = new Date(date);
    const dateSliced = `${realTime.getFullYear()}-${realTime.getMonth() +
      1}-${realTime.getDate()}`;
    const timeSliced = realTime.toTimeString().slice(0, 5);
    const timeToLook = timeSliced
      .split(':')
      .map(val => Number(val))
      .join(':');
    const dataR = [...this.data2];
    const fEle = dataR.find(val => {
      return val.name === dateSliced;
    });
    const fStep = fEle.series.find(val => val.name === timeToLook);
    fStep.value = Number(value);
    this.data2 = [...dataR];
  }
}

export interface Selection {
  nedn: string;
  kpi: string;
}
