import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons/faLockOpen';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

@Injectable({
  providedIn: 'root'
})
export class GetIconsService {
  constructor() {
  }

  getIcon(i: string): IconDefinition {
    switch (i) {
      case 'fas fa-plus':
        return faPlus;
        break;
      case 'fas fa-lock-open':
        return faLockOpen;
        break;
      case 'fas fa-lock':
        return faLock;
        break;
      case 'fas fa-minus':
        return faMinus;
        break;
      default:
        return faSquare;
        break;
    }
  }
}
