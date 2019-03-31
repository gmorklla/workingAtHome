import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
