import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../../models/service/dataSource/field/field.model';
import {EFieldType} from '../../../models/service/dataSource/field/field-type.enum';
import {ServiceFieldDesign} from '../../../models/service/service-field-design.model';
import {VariableDesign} from '../../../models/variable/variable-design.model';
import {ServiceDesign} from '../../../models/service/service-design.model';
import {FieldType} from '../../../models/service/dataSource/field/field-type.model';

@Component({
  selector: 'app-rule-data-source-fields-control',
  templateUrl: './rule-data-source-fields-control.component.html',
  styleUrls: ['./rule-data-source-fields-control.component.css']
})
export class RuleDataSourceFieldsControlComponent implements OnInit {

  @Input() public serviceDesign: ServiceDesign;
  @Input() public listVariableDesign: VariableDesign[];

  public listFields: Field[];

  public listFieldsIn: Field[];
  public listFieldsOut: Field[];

  public listServiceFieldDesignIn: ServiceFieldDesign[];
  public listServiceFieldDesignOut: ServiceFieldDesign[];

  private _index: number;

  constructor() { }

  ngOnInit() {
    console.log('Editing...', this.serviceDesign);

    if (this.serviceDesign.dataSource) {
      this.fn_loadFields();
      this.fn_categorizeFields(false);
    }
  }

  fn_loadFields(): void {
    this.listFields = this.serviceDesign.dataSource.listaCampos;

    this._index = 0;
    this.listServiceFieldDesignIn = [];
    this.listServiceFieldDesignOut = [];
    this.serviceDesign.fields.forEach((_field) => {
      _field._index = this._index++;

      if (_field.type === EFieldType.IN) {
        this.listServiceFieldDesignIn.push(_field);
      } else if (_field.type === EFieldType.OUT) {
        this.listServiceFieldDesignOut.push(_field);
      } else {
        console.log('Field unknown: ', _field);
      }
    });
  }

  fn_categorizeFields(init: boolean): void {
    console.log('fn_categorizeFields', this.listFields);

    if (this.listFields) {
      this.listFieldsIn = [];
      this.listFieldsOut = [];

      if (init) {
        this._index = 0;
        this.listServiceFieldDesignIn = [];
        this.listServiceFieldDesignOut = [];
      }

      this.listFields.forEach((field) => {
        console.log(field);
        if (field.normalizacion) {
          if (field.tipo.id === EFieldType.IN) {
              this.listFieldsIn.push(field);

              if (init && field.esRequerido === true && !field.valorPorDefecto && !field.valorPredeterminado && !field.campoOrigen) {
                const serviceFieldDesign = new ServiceFieldDesign();
                serviceFieldDesign.modelFieldId = field.id;
                serviceFieldDesign.type = EFieldType.IN;
                serviceFieldDesign._index = this._index++;
                this.listServiceFieldDesignIn.push(serviceFieldDesign);
              }
          } else {
            this.listFieldsOut.push(field)
          }
        }
      });
      console.log('[VARIABLE] listServiceFieldDesignIn: ', this.listServiceFieldDesignIn);
    }
  }

  fn_addFieldIn(): void {
    const serviceFieldDesign = new ServiceFieldDesign();
    serviceFieldDesign.type = EFieldType.IN;
    serviceFieldDesign._index = this._index++;
    this.listServiceFieldDesignIn.push(serviceFieldDesign);

    console.log(this.listServiceFieldDesignIn);
  }

  fn_removeFieldIn(field: ServiceFieldDesign): void {
    this.listServiceFieldDesignIn.forEach((_field, i) => {
      if (_field._index === field._index) {
        this.listServiceFieldDesignIn.splice(i, 1);
        return false;
      }
    });
  }

  fn_addFieldOut(): void {
    const serviceFieldDesign = new ServiceFieldDesign();
    serviceFieldDesign.type = EFieldType.OUT;
    serviceFieldDesign._index = this._index++;
    this.listServiceFieldDesignOut.push(serviceFieldDesign);
  }

  fn_removeFieldOut(field: ServiceFieldDesign): void {
    this.listServiceFieldDesignOut.forEach((_field, i) => {
      if (_field._index === field._index) {
        this.listServiceFieldDesignOut.splice(i, 1);
        return false;
      }
    });
  }
}
