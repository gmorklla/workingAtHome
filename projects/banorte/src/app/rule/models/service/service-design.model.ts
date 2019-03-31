import {ServiceFieldDesign} from './service-field-design.model';
import {DataSource} from './dataSource/data-source.model';

export class ServiceDesign {
  id: number;
  designId: number;
  windowId: number;
  dataSource: DataSource;
  description: string;
  fields: ServiceFieldDesign[];
  creationDate: Date;
  updateDate: Date;

  dataSourceId: number;
}
