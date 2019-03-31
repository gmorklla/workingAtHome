import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  fn_success(message: string): void {
    this.fn_openSnackBar(message, '¡Éxito!');
  }

  fn_error(message: string): void {
    this.fn_openSnackBar(message, '¡Error!', 'fu-alert-danger');
  }

  fn_info(message: string, action: string): void {
    this.fn_openSnackBar(message, action);
  }

  /**
   * Message business
   */
  fn_successSave(): void {
    this.fn_success('Cambios guardados correctamente');
  }
  fn_errorSave(): void {
    this.fn_error('Lo siento, no es posible guardar cambios');
  }

  private fn_openSnackBar(message: string, action: string, type?: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type
    });
  }
}
