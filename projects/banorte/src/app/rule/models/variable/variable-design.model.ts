import {Variable} from './variable.model';

export class VariableDesign {
  id: number;
  designId: number;
  windowId: number;
  htmlControlId: number;
  variable: Variable;
  value: string;
  type: string;
  scope: string;

  variableId: number;

  constructor(id?: number) {
    this.id = id;
  }
}
