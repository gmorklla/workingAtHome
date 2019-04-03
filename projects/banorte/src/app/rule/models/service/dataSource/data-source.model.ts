import {DataSourceType} from './data-source-type.model';
import {DataSourceStatus} from './data-source-status.model';
import {OperationType} from './operation-type.model';
import {Field} from './field/field.model';

export class DataSource {
  id: number;
  nombre: string;
  descripcion: string;
  tipoFuente: DataSourceType;
  url: string;
  recurso: string;
  xmlRequestTH: string;
  xmlRequest: string;
  xmlResponse: string;
  estatus: DataSourceStatus;
  tipoOperacion: OperationType;
  seguridad: any;
  header: any;
  listaCampos: Field[];
  ejecucion: any;
  log: any;
  fechaCreacion: string;
  fechaActualizacion: string;
}
