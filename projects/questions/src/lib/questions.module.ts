import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './questions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarPreguntasComponent } from './buscar-preguntas/buscar-preguntas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  declarations: [
    QuestionsComponent,
    BuscarPreguntasComponent
  ],
  exports: [
    QuestionsComponent
  ]
})
export class QuestionsModule { }
