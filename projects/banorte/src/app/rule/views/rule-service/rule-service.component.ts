import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RuleServiceTableComponent} from '../../components/rule-table/rule-service-table/rule-service-table.component';
import {RuleServiceDialogService} from '../../components/rule-dialog/rule-service-dialog/rule-service-dialog.service';
import {RuleVariableComponent} from '../rule-variable/rule-variable.component';

@Component({
  selector: 'app-rule-service',
  templateUrl: './rule-service.component.html',
  styleUrls: ['./rule-service.component.css']
})
export class RuleServiceComponent implements OnInit {

  @Input() public designId: number;
  @Input() public windowId: number;
  @Input() public ruleVariableComponent: RuleVariableComponent;

  @ViewChild(RuleServiceTableComponent) table: RuleServiceTableComponent;

  constructor(private ruleServiceDialogService: RuleServiceDialogService) { }

  ngOnInit() {
    this.ruleServiceDialogService.init(this.table);
  }

  /**
   * New service
   */
  fn_openDialogForNew(): void {
    this.ruleServiceDialogService.open(null,
      {
        designId: this.designId,
        windowId: this.windowId,
        listVariableDesign: this.ruleVariableComponent.table.dataSource ? this.ruleVariableComponent.table.dataSource.data: []
      });
  }
}
