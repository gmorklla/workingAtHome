import {Instruction} from './instruction.model';

export class Rule {
  id: number;
  windowId: number;
  name: string;
  phase: string;
  statusId: number;
  instructions: Instruction[];
  creationDate: Date;
  updateDate: Date;
}
