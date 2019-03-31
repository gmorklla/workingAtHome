import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-number-dialog',
  templateUrl: 'number-dialog.html',
  styleUrls: ['./number-dialog.component.css']
})
export class NumberDialogComponent implements OnInit {
  dialogForm: FormGroup;
  nodeTypes = ['CSCF'];
  elements = ['nedn', 'moid', 'measurement'];

  constructor(
    public dialogRef: MatDialogRef<NumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const dialogOpts = {
      nodeType: ['', [Validators.required]],
      element: ['', [Validators.required]]
    };
    this.dialogForm = this.fb.group(dialogOpts);
  }

  close(): void {
    const selection = {
      nodeType: this.dialogForm.get('nodeType').value,
      element: this.dialogForm.get('element').value
    };
    this.dialogRef.close(selection);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
