import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatAutocomplete, MatAutocompleteSelectedEvent,
  MatChipInputEvent, MatDatepickerInputEvent
} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Rx';
import {map, startWith, tap, distinctUntilChanged} from 'rxjs/internal/operators';
import {ChannelService} from '../../../../../../campaigns/src/lib/services/channel.service';
import {Channel} from '../../../../../../campaigns/src/lib/models/channel.model';
import {Flow} from '../../../models/flow.model';
import {FlowStatus} from '../../../models/flow.status.model';
import {FlowStatusConstant} from '../../../models/constants/flow.status.constant';
import {LinkedChannel} from '../../../../../../campaigns/src/lib/models/linked.channel.model';
import { UtilsService } from 'projects/campaigns/src/lib/services/utils/utils.service';

@Component({
  selector: 'lib-flow-form',
  templateUrl: './flow-form.component.html',
  styleUrls: ['./flow-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class FlowFormComponent implements OnInit {

  @Input() public flow: Flow;

  @Output() saveOrUpdate = new EventEmitter();

  minDate = new Date();

  mainForm: FormGroup;

  /**
   * Multi-options
   */
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  channelCtrl = new FormControl();
  filteredChannels: Observable<Channel[]>;
  channels: Channel[] = [];
  allChannels: Channel[] = [];

  @ViewChild('channelInput') channelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder,
              private channelService: ChannelService,
              private utilsService: UtilsService) {

  }

  ngOnInit() {
    this.createMainForm();
    this.fn_getAllChannel();
  }

  private createMainForm() {
    this.mainForm = this.formBuilder.group({
      'name': new FormControl('', [
        Validators.required
      ]),
      'startDate': new FormControl({ value: null, disabled: false }, [
        Validators.required
      ]),
      'endDate': new FormControl({ value: null, disabled: false }, [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required
      ])
    });
  }

  private fn_getAllChannel(): void {
    this.channelService.fn_getAll().subscribe({
      next: (result: Channel[]) => {
        console.log('[RESPONSE]', result);
        this.allChannels = result;

        this.fn_initFilteredChannels();
      },
      error: (error: any) => {
        console.log(error);
        // this.alertasService.operacionFallida(error.message);
      },
      complete: () => {
        console.log('OK');
      }
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
  fn_phAvailableChannels(): string {
    return `Vinculando ${this.channels.length} canal${this.channels.length === 1 ? '' : 'es'} de ${this.allChannels.length} disponibles`;
  }

  fn_onEventStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.flow.startDate = new Date(event.value);
  }

  fn_onEventEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.flow.endDate = new Date(event.value);
  }

  /**
   * Link to channels
   */
  fn_initFilteredChannels(): void {
    this.filteredChannels = this.channelCtrl.valueChanges.pipe(  
      startWith(null),
      map((search: string | null) => search ? this._filter(search) : this._available()));
  }
  
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if (input) {
        input.value = '';
      }
      this.channelCtrl.setValue(null);
    }
  }

  remove(channel: Channel): void {
    this.channels.forEach((_channel, index) => {
      if (_channel.idSubChannel === channel.idSubChannel) {
        this.channels.splice(index, 1);
        return false;
      }
    });
    this.fn_initFilteredChannels();
  }

  selected(event: MatAutocompleteSelectedEvent): void {   
    if (!this.fn_containsChannel(event.option.value)) {
      this.channels.push(event.option.value);
    }
    this.channelInput.nativeElement.value = null;
    this.channelCtrl.setValue(null);
  }

  fn_selectAll(): void {
    if (this.channels.length === this.allChannels.length) {
      this.channels = [];
    } else {
      this.allChannels.forEach((_channel) => {
        if (!this.fn_containsChannel(_channel)) {
          this.channels.push(_channel);
        }
      });
    }
    this.fn_initFilteredChannels();
  }

  private _filter(search: any): Channel[] { // string | Channel
    const availableChannels: Channel[] = this._available();
    if (!search.idSubChannel) {
      const filterValue = this.utilsService.fn_normalize(search.toLowerCase()); 
      return availableChannels.filter(fruit => this.utilsService.fn_normalize(fruit.descriptionSubChannel.toLowerCase()).indexOf(filterValue) !== -1);
    }
    return availableChannels;
  }

  private _available(): Channel[] {
    const availableChannels: Channel[] = [];
    this.allChannels.forEach((_channel) => {
      if (!this.fn_containsChannel(_channel)) {
        availableChannels.push(_channel);
      }
    });
    return availableChannels;
  }

  private fn_containsChannel(channel: Channel): boolean {
    let contains = false;
    this.channels.forEach((_channel) => {
      if (_channel.idSubChannel === channel.idSubChannel) {
        contains = true;
        return false;
      }
    });
    return contains;
  }

  fn_save(): void {
    console.log(this.mainForm.value);

    this.flow.name = this.mainForm.value.name;
    this.flow.description = this.mainForm.value.description;
    this.flow.status = new FlowStatus(FlowStatusConstant.ACTIVE);

    const listLinkedChannel: LinkedChannel[] = [];
    this.channels.forEach((_channel) => {
      const linkedChannel = new LinkedChannel();
      linkedChannel.channel = _channel;

      listLinkedChannel.push(linkedChannel);
    });
    this.flow.listLinkedChannels = listLinkedChannel;

    this.saveOrUpdate.emit(this.flow);
  }
}
