import {Injectable} from '@angular/core';
import {Alerta} from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  public alertas: Alerta[];

  constructor() {

    this.alertas = [];

  }

  reset(): void {
    const longitudArray: number = this.alertas.length;

    for (let i = 0; i < longitudArray; i++) {
      this.alertas.pop();
    }
  }

  seCreoConExito(): void {
    this.alertas.push({type: 'success', msg: 'Se creó con éxito', icon: 'far fa-check-circle'});
  }

  exitoActualizar(): void {
    this.alertas.push({type: 'success', msg: 'Se actualizó con éxito', icon: 'far fa-check-circle'});
  }

  exitoEjecutar(): void {
    this.alertas.push({type: 'success', msg: 'Se ejecutó con éxito', icon: 'far fa-check-circle'});
  }

  noSePudoActualizar(): void {
    this.alertas.push({type: 'error', msg: 'No se pudo actualizar', icon: 'fas fa-exclamation-circle'});
  }

  noSePudoEjecutar(): void {
    this.alertas.push({type: 'error', msg: 'No se pudo actualizar', icon: 'fas fa-exclamation-circle'});
  }

  operacionFallida(mensaje: string): void {
    this.alertas.push({type: 'error', msg: mensaje, icon: 'fas fa-exclamation-circle'});
  }

  onClosed(dismissedAlert: any): void {
    this.alertas = this.alertas.filter(alert => alert !== dismissedAlert);
  }

  operacionExitosa(mensaje: string): void {
    this.alertas.push({type: 'error', msg: mensaje, icon: 'far fa-check-circle'});
  }

}
