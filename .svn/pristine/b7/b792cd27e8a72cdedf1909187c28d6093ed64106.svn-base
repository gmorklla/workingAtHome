import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardSpawnerComponent } from './dashboard/card-spawner/card-spawner.component';
import { TestComponent } from './dashboard/test/test.component';
import { DashboardCardsService } from '../shared/services/dashboard-cards.service';
import { ChartPieModule } from 'projects/chart-pie/src/public_api';
import { ChartBarModule } from 'projects/chart-bar/src/public_api';
import { NumberCardModule } from 'projects/number-card/src/public_api';
import { NumberDialogComponent } from './dashboard/number-card/dialog/number-dialog.component';
import { LinearGaugeModule } from 'projects/linear-gauge/src/public_api';
import { BarChartComponent } from '../dashboard/dashboard/bar-chart/bar-chart.component';
import { BarDialogComponent } from './dashboard/bar-chart/dialog/bar-dialog.component';
import { PieChartComponent } from './dashboard/pie-chart/pie-chart.component';
import { DialogComponent } from './dashboard/pie-chart/dialog/dialog.component';
import { NumberCardComponent } from './dashboard/number-card/number-card.component';
import { LinearGaugeComponent } from './dashboard/linear-gauge/linear-gauge.component';
import { CustomPipesModule } from 'projects/custom-pipes/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    DashboardRoutingModule,
    ChartPieModule,
    ChartBarModule,
    NumberCardModule,
    LinearGaugeModule,
    CustomPipesModule
  ],
  declarations: [
    DashboardComponent,
    CardSpawnerComponent,
    TestComponent,
    BarChartComponent,
    PieChartComponent,
    NumberCardComponent,
    LinearGaugeComponent,
    DialogComponent,
    NumberDialogComponent,
    BarDialogComponent
  ],
  providers: [DashboardCardsService],
  entryComponents: [DialogComponent, NumberDialogComponent, BarDialogComponent]
})
export class DashboardModule {}
