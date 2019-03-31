import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {
  private listening: boolean;
  constructor(
    private emitterS: EventEmitterService,
    private snack: SnackBarService
  ) {
    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 'a') {
        this.snack.open('Listo para agregar control', 'Ok');
        this.emitterS.dispatchShortcutsMenu(true);
        this.listening = true;
      }
    });
    window.addEventListener('keyup', event => {
      if (this.listening && event.key === 'm') {
        this.cancela();
        // Mensaje
        this.emitterS.createControl$.next({
          id: 1,
          type: 'control'
        });
        // this.emitterS.dispatchShortcut({
        //   id: 1,
        //   type: 'control'
        // });
      }
      // Texto
      if (this.listening && event.key === 't') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 2,
          type: 'control'
        });
      }
      // Email
      if (this.listening && event.key === 'e') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 3,
          type: 'control'
        });
      }
      // Contraseña
      if (this.listening && event.key === 'c') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 4,
          type: 'control'
        });
      }
      // Numero
      if (this.listening && event.key === 'n') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 5,
          type: 'control'
        });
      }
      // Combo
      if (this.listening && event.key === 'o') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 6,
          type: 'control'
        });
      }
      // Radio
      if (this.listening && event.key === 'r') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 7,
          type: 'control'
        });
      }
      // Checkbox
      if (this.listening && event.key === 'h') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 8,
          type: 'control'
        });
      }
      // Rango
      if (this.listening && event.key === 'g') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 9,
          type: 'control'
        });
      }
      // Boton
      if (this.listening && event.key === 'b') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 10,
          type: 'control'
        });
      }
      // Area texto
      if (this.listening && event.key === 'x') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 11,
          type: 'control'
        });
      }
      // Link
      if (this.listening && event.key === 'l') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 12,
          type: 'control'
        });
      }
      // Archivo
      if (this.listening && event.key === 'f') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 13,
          type: 'control'
        });
      }
      // Imagen
      if (this.listening && event.key === 'i') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 14,
          type: 'control'
        });
      }
      // Video
      if (this.listening && event.key === 'v') {
        this.cancela();
        this.emitterS.createControl$.next({
          id: 15,
          type: 'control'
        });
      }
      // Token
      if (this.listening && event.key === 'k') {
        this.cancela();
        this.emitterS.dispatchShortcut({
          id: 2,
          type: 'widget'
        });
      }
      // Copy
      if (this.listening && event.key === 'p') {
        this.cancela();
        this.emitterS.command$.next({
          id: 1,
          type: 'command'
        });
      }
      // Paste
      if (this.listening && event.key === 's') {
        this.cancela();
        this.emitterS.command$.next({
          id: 2,
          type: 'command'
        });
      }
      // LockAxis x
      if (
        (this.listening && event.key === 'ArrowLeft') ||
        (this.listening && event.key === 'ArrowRight')
      ) {
        this.cancela();
        this.emitterS.dispatchLockAxis('x');
      }
      // LockAxis y
      if (
        (this.listening && event.key === 'ArrowUp') ||
        (this.listening && event.key === 'ArrowDown')
      ) {
        this.cancela();
        this.emitterS.dispatchLockAxis('y');
      }
      // Delete
      if (
        (event.code === 'Delete' && event.ctrlKey) ||
        (event.code === 'Backspace' && event.ctrlKey)
      ) {
        this.emitterS.command$.next({
          id: 3,
          type: 'command'
        });
      }
    });
  }

  cancela() {
    this.listening = false;
    this.emitterS.dispatchShortcutsMenu(false);
  }
}
