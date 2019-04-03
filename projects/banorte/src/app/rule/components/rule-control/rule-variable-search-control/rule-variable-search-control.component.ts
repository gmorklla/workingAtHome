import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Variable} from '../../../models/variable/variable.model';
import {Observable} from 'rxjs/Rx';
import {debounceTime, switchMap} from 'rxjs/internal/operators';
import {VariableService} from '../../../services/variable/variable.service';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-rule-variable-search-control',
  templateUrl: './rule-variable-search-control.component.html',
  styleUrls: ['./rule-variable-search-control.component.css']
})
export class RuleVariableSearchControlComponent implements OnInit {

  @Input() public parentForm: FormGroup;

  @Output() public update = new EventEmitter();

  public filteredVariable: Observable<Variable[]>;

  constructor(private variableService: VariableService) { }

  ngOnInit() {
    this.filteredVariable = this.parentForm.controls.variable.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(search => {
          let filterValue;
          if (search instanceof Variable || search.name) {
            filterValue = search.name;
          } else {
            filterValue = search;
          }

          return this.variableService.fn_search(filterValue)
        })
      );
  }

  fn_display(variable?: Variable): string | undefined {
    return variable ? variable.name : undefined;
  }

  fn_optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.update.emit(event.option.value);
  }

  /**
   * For validations
   */

  get variable() {
    return this.parentForm.get('variable');
  }
}
