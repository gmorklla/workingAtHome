
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { of, iif } from 'rxjs';
import {
  distinctUntilChanged,
  tap,
  switchMap,
  debounceTime,
  filter,
  skip,
  mergeMap
} from 'rxjs/operators';

export interface ControlesI {
  id: number;
  type: string;
  description: string;
  image: string;
  tag: string;
  attributes: {};
}
@Component({
  selector: 'app-button-delete',
  templateUrl: './input-button-delete.component.html',
  styleUrls: ['./input-button-delete.component.css']
})

export class DeleteComponent implements OnInit {
  stylesContainerForm: FormGroup;
  @Output() propChange = new EventEmitter();
  @Input() control: ControlesI;

  constructor(private emitterS: EventEmitterService) { }

  ngOnInit() {
  }
  deleteItem(e) {
    this.emitterS.dispatchEvent({control:this.control,data:{delete:this.control}});
  }
}
