import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatAutocomplete, MatAutocompleteSelectedEvent,
  MatChipInputEvent, MatDatepickerInputEvent
} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Rx';
import {map, startWith} from 'rxjs/internal/operators';
import {ChannelService} from '../../../../../../campaigns/src/lib/services/channel.service';
import {Channel} from '../../../../../../campaigns/src/lib/models/channel.model';
import {Flow} from '../../../models/flow.model';
import {FlowStatus} from '../../../models/flow.status.model';
import {FlowStatusConstant} from '../../../models/constants/flow.status.constant';
import {LinkedChannel} from '../../../../../../campaigns/src/lib/models/linked.channel.model';

@Component({
  selector: 'lib-flow-form-edit',
  templateUrl: './flow-form-edit.component.html',
  styleUrls: ['./flow-form-edit.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class FlowFormEditComponent implements OnInit {

  @Input() public flow: Flow;

  @Output() saveOrUpdate = new EventEmitter();

  minDate = new Date();

  mainForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private channelService: ChannelService) {

  }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    this.mainForm = this.formBuilder.group({
      'name': new FormControl(this.flow.name, [
        Validators.required
      ]),
      'startDate': new FormControl({ value: new Date(this.flow.startDate), disabled: false }, [
        Validators.required
      ]),
      'endDate': new FormControl({ value: new Date(this.flow.endDate), disabled: false }, [
        Validators.required
      ]),
      'description': new FormControl(this.flow.description, [
        Validators.required
      ])
    });
  }

  /**
   * For validations
   */

  get name() {
    return this.mainForm.get('name');
  }

  get startDate() {
    return this.mainForm.get('startDate');
  }

  get endDate() {
    return this.mainForm.get('endDate');
  }

  get description() {
    return this.mainForm.get('description');
  }

  /**
   * Perzonalize view
   */
  fn_onEventStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.flow.startDate = new Date(event.value);
  }

  fn_onEventEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.flow.endDate = new Date(event.value);
  }

  fn_update(): void {
    console.log(this.mainForm.value);

    this.flow.name = this.mainForm.value.name;
    this.flow.description = this.mainForm.value.description;
    this.flow.status = new FlowStatus(FlowStatusConstant.ACTIVE);

    this.saveOrUpdate.emit(this.flow);
  }
}
