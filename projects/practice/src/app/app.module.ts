import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { ContentCmpComponent } from './content-cmp/content-cmp.component';
import { DragResizeComponent } from './drag-resize/drag-resize.component';

@NgModule({
  declarations: [
    AppComponent,
    DinamicoComponent,
    ContentCmpComponent,
    DragResizeComponent
  ],
  imports: [BrowserModule, FormsModule, AngularDraggableModule],
  providers: [],
  entryComponents: [DinamicoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
