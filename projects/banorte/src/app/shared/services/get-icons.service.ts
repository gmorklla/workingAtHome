import { Injectable } from '@angular/core';
import {
  faLink,
  faCaretSquareRight,
  faCheckSquare,
  faCommentAlt,
  faEnvelope,
  faPaperclip,
  faImage,
  faSortNumericUp,
  faKey,
  faCheckCircle,
  faSlidersH,
  faCaretSquareDown,
  faPen,
  faSquare,
  faFileVideo,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class GetIconsService {
  constructor() {}

  getIcon(i: string): IconDefinition {
    switch (i) {
      case 'fas fa-link':
        return faLink;
        break;
      case 'fas fa-caret-square-right':
        return faCaretSquareRight;
        break;
      case 'fas fa-check-square':
        return faCheckSquare;
        break;
      case 'fas fa-comment-alt':
        return faCaretSquareDown;
        break;
      case 'fas fa-envelope':
        return faEnvelope;
        break;
      case 'fas fa-paperclip':
        return faPaperclip;
        break;
      case 'fas fa-image':
        return faImage;
        break;
      case 'fas fa-sort-numeric-up':
        return faSortNumericUp;
        break;
      case 'fas fa-key':
        return faKey;
        break;
      case 'fas fa-check-circle':
        return faCheckCircle;
        break;
      case 'fas fa-sliders-h':
        return faSlidersH;
        break;
      case 'fas fa-caret-square-down':
        return faCaretSquareDown;
        break;
      case 'fas fa-pen':
        return faPen;
        break;
      case 'fas fa-square':
        return faSquare;
        break;
      case 'fas fa-file-video':
        return faFileVideo;
        break;
      default:
        return faLink;
        break;
    }
  }
}
