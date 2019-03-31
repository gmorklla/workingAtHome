import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialogForm: FormGroup;
  nedns = ['R5TEPECSCF01', 'R5TEPECSCF02'];
  kpis = ['IMSCSCFInitRegSuccRatio', 'IMSCSCFOrgSessSetupSuccRatio'];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const dialogOpts = {
      nedn: ['', [Validators.required]],
      kpi: ['', [Validators.required]]
    };
    this.dialogForm = this.fb.group(dialogOpts);
  }

  close(): void {
    const selection = {
      nedn: this.dialogForm.get('nedn').value,
      kpi: this.dialogForm.get('kpi').value
    };
    this.dialogRef.close(selection);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
