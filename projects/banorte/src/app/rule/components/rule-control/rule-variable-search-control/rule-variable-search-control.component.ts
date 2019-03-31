import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-rule-variable-search-control',
  templateUrl: './rule-variable-search-control.component.html',
  styleUrls: ['./rule-variable-search-control.component.css']
})
export class RuleVariableSearchControlComponent implements OnInit {

  @Input() public parentForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  /**
   * For validations
   */

  get variableName() {
    return this.parentForm.get('variableName');
  }

}
