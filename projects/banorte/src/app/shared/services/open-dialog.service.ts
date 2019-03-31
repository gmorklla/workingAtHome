import { Injectable } from '@angular/core';
import { DialogComponent } from 'projects/banorte/src/app/shared/dialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(mensaje: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        mensaje: mensaje
      }
    });

    return dialogRef.afterClosed();
  }
}
