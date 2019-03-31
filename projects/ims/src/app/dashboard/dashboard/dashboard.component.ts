import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardCardsService } from '../../shared/services/dashboard-cards.service';
import { DashboardCard } from './dashboard-card';
import { TestComponent } from './test/test.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NumberCardComponent } from './number-card/number-card.component';
import { LinearGaugeComponent } from './linear-gauge/linear-gauge.component';
import { Observable, Subscription } from 'rxjs';
import { SettingDashboardService } from '../../shared/services/setting-dashboard.service';
import { DataBusService } from '../../shared/services/data-bus.service';
import { PdfGeneratorService } from 'projects/pdf-generator/src/public_api';
import { switchMap, map, tap } from 'rxjs/operators';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  entryComponents: [
    TestComponent,
    BarChartComponent,
    PieChartComponent,
    NumberCardComponent,
    LinearGaugeComponent
  ],
  providers: [SettingDashboardService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  cards: DashboardCard[] = [];
  cols: Observable<number>;
  cols_big: Observable<number>;
  cols_sml: Observable<number>;
  print$: Subscription;

  constructor(
    private cardsService: DashboardCardsService,
    private dashConfig: SettingDashboardService,
    private dataBus: DataBusService,
    private pdf: PdfGeneratorService,
    private snack: SnackBarService
  ) {
    this.cardsService.cards.subscribe(cards => (this.cards = cards));
  }

  ngOnInit() {
    this.cardsService.resetCards();
    this.cols = this.dashConfig.cols;
    this.cols_big = this.dashConfig.cols_big;
    this.cols_sml = this.dashConfig.cols_sml;
    this.dashConfig.createCards();
    // Subscribe to print$ if there is not a subscription already
    if (!this.print$) {
      this.print$ = this.dataBus.printDash$
        .pipe(
          // Make a clone of div to apply optimizations (it has to be appended not in memory)
          map(() => {
            const data = document.getElementById('dashboard');
            const clone = document.createElement('div');
            clone.setAttribute('id', 'clone');
            clone.appendChild(data.cloneNode(true));
            document.body.appendChild(clone);
            this.optimizeForPrint(clone);
            return clone;
          }),
          // Pass clone element to generatePDF service
          switchMap(clone => this.pdf.generatePDF(clone)),
          // Remove clone from document
          tap(() => document.getElementById('clone').remove())
        )
        .subscribe(() => this.snack.open('Pdf created!', 'ok'));
    }
  }

  ngOnDestroy() {
    this.print$.unsubscribe();
  }
  // Set necessary attributes & styles to generate the pdf correctly
  private optimizeForPrint(data: HTMLElement) {
    // Set font on all svg elements
    const elements = Array.from(data.getElementsByTagName('svg'));
    elements.forEach(val => (val.style.fontFamily = 'Arial, sans-serif'));
    // Set font size
    const tspans = Array.from(data.getElementsByTagName('tspan'));
    tspans.forEach((val, index) => {
      if (index % 2 === 0) {
        val.style.fontSize = '1em';
      } else {
        val.style.fontSize = '0.4em';
      }
    });
    // Set fill color on remaing of gauge (donuts) if not the pdf print it in black
    const gaugeArcs = Array.from(data.getElementsByClassName('arc'));
    gaugeArcs.forEach((val, index) => {
      if (index % 2 === 0) {
        val.setAttribute('fill', 'whitesmoke');
      }
    });
    // Set fill color on remaing of gauge (linear) if not the pdf print it in black
    const bars = Array.from(data.getElementsByClassName('bar'));
    bars.forEach(bar => {
      const fill = bar.getAttribute('fill');
      if (!fill) {
        bar.setAttribute('fill', 'whitesmoke');
      }
    });
  }
}
