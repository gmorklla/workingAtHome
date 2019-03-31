import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractDashboardCard } from '../abstract-dashboard-card';
import { DashboardCard } from '../dashboard-card';
import { DashboardCardsService } from '../../../shared/services/dashboard-cards.service';
import { Subscription } from 'rxjs';
import { NumberDialogComponent } from './dialog/number-dialog.component';
import { skipWhile, switchMap } from 'rxjs/operators';
import { HttpCallService } from 'projects/http-call/src/public_api';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.css']
})
export class NumberCardComponent extends AbstractDashboardCard
  implements OnInit {
  data;
  showRBtn = false;
  dialogSubs: Subscription;
  nodeType = '';
  element = '';

  constructor(
    private injector: Injector,
    private dashS: DashboardCardsService,
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
    const dialogRef = this.dialog.open(NumberDialogComponent, data);
    this.dialogSubs = dialogRef
      .afterClosed()
      .pipe(
        skipWhile((val: Selection) => !val),
        switchMap((selection: Selection) => {
          this.nodeType = selection.nodeType;
          this.element = selection.element;
          const endpoint = 'http://localhost:4000/numberOf';
          const params = {
            term: selection.element,
            nodeType: selection.nodeType
          };
          return this.http.getRequest(endpoint, params);
        })
      )
      .subscribe(res => {
        this.setData(res);
        console.log('res', res);
      });
  }

  setData(val) {
    const { number } = val;
    const obj = {
      value: number,
      name: this.element
    };
    this.data = [obj];
  }
}

export interface Selection {
  nodeType: string;
  element: string;
}
