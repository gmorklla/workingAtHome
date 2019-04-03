import {VariableDesign} from '../variable/variable-design.model';

export class ServiceFieldDesign {
  id: number;
  serviceId: number;
  type: string;
  designVariable: VariableDesign;

  modelFieldId: number;
  designVariableId: number;

  _index: number;
}
