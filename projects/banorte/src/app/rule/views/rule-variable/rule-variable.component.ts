import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RuleVariableTableComponent} from '../../components/rule-table/rule-variable-table/rule-variable-table.component';
import {VariableType} from '../../models/variable/variable-type.enum';
import {VariableScope} from '../../models/variable/variable-scope.enum';
import {VariableSource} from '../../models/variable/variable-source.enum';
import {RuleVariableDialogService} from '../../components/rule-dialog/rule-variable-dialog/rule-variable-dialog.service';

@Component({
  selector: 'app-rule-variable',
  templateUrl: './rule-variable.component.html',
  styleUrls: ['./rule-variable.component.css']
})
export class RuleVariableComponent implements OnInit {

  @Input() public designId: number;
  @Input() public windowId: number;

  @ViewChild(RuleVariableTableComponent) table: RuleVariableTableComponent;

  constructor(private ruleVariableDialogService: RuleVariableDialogService) { }

  ngOnInit() {
    this.ruleVariableDialogService.init(this.table);
  }

  /**
   * New variable
   */
  fn_openDialogForNew(): void {
    this.ruleVariableDialogService.open(null,
      {
        designId: this.designId,
        windowId: this.windowId,
        source: VariableSource.BUSINESS,
        type: VariableType.DYNAMIC,
        scope: VariableScope.SESSION
      });
  }
}
