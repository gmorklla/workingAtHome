import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataTypeService} from '../../services/variable/data-type.service';
import {DataType} from '../../models/variable/data-type.model';
import {Messages} from '../../../shared/messages';
import {AlertService} from '../../../../../../campaigns/src/lib/services/alert/alert.service';

@Component({
  selector: 'app-rule-configuration',
  templateUrl: './rule-configuration.component.html',
  styleUrls: ['./rule-configuration.component.css']
})
export class RuleConfigurationComponent implements OnInit {

  public designId: string;
  public windowId: string;
  public listDataType: DataType[];

  constructor(private dataTypeService: DataTypeService,
              private alertService: AlertService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.designId = this.route.snapshot.paramMap.get('designId');
      console.log('Design ID: ', this.designId);

      this.windowId = this.route.snapshot.paramMap.get('windowId');
      console.log('Window ID: ', this.windowId);
    });

    this.getAllDataType();
  }

  private getAllDataType(): void {
    this.dataTypeService.fn_getAll().subscribe({
      next: (result: DataType[]) => {
        console.log('[RESPONSE]', result);
        this.listDataType = result;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG_RULE_VARIABLE_DATA_TYPE_GET_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    })
  }
}
