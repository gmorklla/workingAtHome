import { NgModule } from '@angular/core';
import { LinearGaugeComponent } from './linear-gauge.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [NgxChartsModule],
  declarations: [LinearGaugeComponent],
  exports: [LinearGaugeComponent]
})
export class LinearGaugeModule {}
