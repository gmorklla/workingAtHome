import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IframeComponent } from './iframe.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmbedVideo } from 'ngx-embed-video';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    AngularDraggableModule,
    MatTooltipModule,
    EmbedVideo.forRoot()
  ],
  declarations: [IframeComponent],
  exports: [IframeComponent],
  entryComponents: [IframeComponent]
})
export class IframeModule {}
