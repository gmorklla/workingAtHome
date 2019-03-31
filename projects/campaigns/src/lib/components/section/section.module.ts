import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkedChannelDetailsComponent} from './linked-channel-details/linked-channel-details.component';
import {
  MatButtonModule, MatIconModule, MatListModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {DesignService} from '../../services/design.service';
import {RouterModule} from '@angular/router';
import {LinkedChannelDesignService} from '../../services/linked-channel-design.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  declarations: [
    LinkedChannelDetailsComponent
  ],
  exports: [
    LinkedChannelDetailsComponent
  ],
  providers: [
    DesignService,
    LinkedChannelDesignService
  ]
})
export class SectionModule { }
