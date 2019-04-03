import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RuleExpressionTableComponent} from '../../components/rule-table/rule-expression-table/rule-expression-table.component';
import {RuleExpressionDialogService} from '../../components/rule-dialog/rule-expression-dialog/rule-expression-dialog.service';
import {RuleVariableComponent} from '../rule-variable/rule-variable.component';

@Component({
  selector: 'app-rule-expression',
  templateUrl: './rule-expression.component.html',
  styleUrls: ['./rule-expression.component.css']
})
export class RuleExpressionComponent implements OnInit {

  @Input() public designId: number;
  @Input() public windowId: number;
  @Input() public ruleVariableComponent: RuleVariableComponent;

  @ViewChild(RuleExpressionTableComponent) table: RuleExpressionTableComponent;

  constructor(private ruleExpressionDialogService: RuleExpressionDialogService) { }

  ngOnInit() {
    this.ruleExpressionDialogService.init(this.table);
  }

  /**
   * New expression
   */
  fn_openDialogForNew(): void {
    this.ruleExpressionDialogService.open(null,
      {
        designId: this.designId,
        windowId: this.windowId,
        listVariableDesign: this.ruleVariableComponent.table.dataSource ? this.ruleVariableComponent.table.dataSource.data: []
      });
  }
}
