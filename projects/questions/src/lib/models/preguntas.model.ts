import { Answer } from './answers.model';
export class Pregunta {
    id: number;
    description: string;
    type: number;
    answers?: Answer;
  }
