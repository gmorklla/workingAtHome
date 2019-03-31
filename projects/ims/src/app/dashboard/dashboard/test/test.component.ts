import { Component, OnInit, Injector } from '@angular/core';
import { AbstractDashboardCard } from '../abstract-dashboard-card';
import { DashboardCard } from '../dashboard-card';
import { one } from '../../../shared/config/data';
import { DashboardCardsService } from '../../../shared/services/dashboard-cards.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends AbstractDashboardCard implements OnInit {
  data = one;
  showRBtn = false;

  constructor(
    private injector: Injector,
    private dashS: DashboardCardsService
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
}
