import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatSelectModule } from '@angular/material/select';
import { EmbedVideo } from 'ngx-embed-video';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    DragDropModule,
    HttpClientModule,
    AngularDraggableModule,
    MatSelectModule,
    MatIconModule,
    EmbedVideo.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
