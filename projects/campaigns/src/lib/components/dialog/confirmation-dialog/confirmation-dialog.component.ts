import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  info: string;
  iconNo: string;
  labelNo: string;
  iconYes: string;
  labelYes: string;
}

@Component({
  selector: 'lib-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: ConfirmationDialogData) {
    if (!data.title) {
      data.title = 'Alerta';
    }
    if (!data.message) {
      data.message = '¿Desea continuar?';
    }
    if (!data.iconNo) {
      data.iconNo = 'clear';
    }
    if (!data.labelNo) {
      data.labelNo = 'Cancelar';
    }
    if (!data.iconYes) {
      data.iconYes = 'done';
    }
    if (!data.labelYes) {
      data.labelYes = 'Aceptar';
    }
  }

  ngOnInit() {
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }
}
