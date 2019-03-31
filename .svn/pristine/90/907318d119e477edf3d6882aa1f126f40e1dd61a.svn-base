import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Day} from '../../../models/configuration/day.model';
import {Configuration} from '../../../models/configuration.model';
import {LinkedChannel} from '../../../models/linked.channel.model';
import {Process} from '../../../models/process.interface';

export interface ConfigurationDialogData {
  process: Process,
  linkedChannel: LinkedChannel,
  configuration: Configuration,
  listDays: Day[]
}

@Component({
  selector: 'lib-configuration-dialog',
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.css']
})
export class ConfigurationDialogComponent implements OnInit {

  public configurationForm: FormGroup;

  listRecurrency: String[];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ConfigurationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: ConfigurationDialogData) {
    this.listRecurrency = [];
    for (let i = 1; i <= 24; i++) {
      this.listRecurrency.push(String(i));
    }
  }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    let scheduleFrom = '';
    let scheduleTo = '';
    let listDays = null;
    let recurrency = '';

    if (this.data.configuration) {
      scheduleFrom = this.data.configuration.scheduleFrom;
      scheduleTo = this.data.configuration.scheduleTo;

      if (this.data.configuration.listDays && this.data.configuration.listDays.length > 0) {
        listDays = [];
        this.data.configuration.listDays.forEach((day) => {
          this.data.listDays.forEach((_day) => {
            if (day.id === _day.id) {
              listDays.push(_day);
              return false;
            }
          })
        });
      }

      recurrency = this.data.configuration.recurrency;
    }

    this.configurationForm = this.formBuilder.group({
      'id': new FormControl(),
      'scheduleFrom': new FormControl(scheduleFrom),
      'scheduleTo': new FormControl(scheduleTo),
      'listDays': new FormControl(listDays),
      'recurrency': new FormControl(recurrency)
    });
    console.log(this.configurationForm);
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }

  fn_generateConfig(): Configuration {
    const configuration = new Configuration()
    configuration.scheduleFrom = this.configurationForm.value.scheduleFrom;
    configuration.scheduleTo = this.configurationForm.value.scheduleTo;
    configuration.listDays = this.configurationForm.value.listDays;
    configuration.recurrency = this.configurationForm.value.recurrency;

    return configuration;
  }
}
