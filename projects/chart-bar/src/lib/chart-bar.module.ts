import { NgModule } from '@angular/core';
import { ChartBarComponent } from './chart-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [NgxChartsModule],
  declarations: [ChartBarComponent],
  exports: [ChartBarComponent]
})
export class ChartBarModule {}
