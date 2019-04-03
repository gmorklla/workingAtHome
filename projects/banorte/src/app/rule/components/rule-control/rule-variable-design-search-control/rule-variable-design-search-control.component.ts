import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VariableDesign} from '../../../models/variable/variable-design.model';
import {Observable} from 'rxjs/Rx';
import {UtilsService} from '../../../../../../../campaigns/src/lib/services/utils/utils.service';
import {map, startWith} from 'rxjs/internal/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {RuleVariableDialogService} from '../../rule-dialog/rule-variable-dialog/rule-variable-dialog.service';

@Component({
  selector: 'app-rule-variable-design-search-control',
  templateUrl: './rule-variable-design-search-control.component.html',
  styleUrls: ['./rule-variable-design-search-control.component.css']
})
export class RuleVariableDesignSearchControlComponent implements OnInit {

  @Input() public designId: number;
  @Input() public windowId: number;
  @Input() public source: string;
  @Input() public type: string;
  @Input() public scope: string;
  @Input() public placeholder: string;
  @Input() public parentForm: FormGroup;
  @Input() public listVariableDesign: VariableDesign[];

  @Output() public update = new EventEmitter();

  public filteredVariableDesign: Observable<VariableDesign[]>;

  constructor(private ruleVariableDialogService: RuleVariableDialogService,
              private utilsService: UtilsService) {
    this.placeholder = 'Seleccionar variable';
  }

  ngOnInit() {
    this.filteredVariableDesign = this.parentForm.controls.variableDesign.valueChanges
      .pipe(
        startWith(''),
        map(search => search ? this.fn_filter(search) : this.listVariableDesign.slice())
      );
  }

  private fn_filter(search: any): VariableDesign[] {
    let filterValue;
    if (search instanceof VariableDesign || search.variable) {
      filterValue = search.variable.name;
    } else {
      filterValue = search;
    }
    filterValue = this.utilsService.fn_normalize(filterValue.toLowerCase());

    return this.listVariableDesign.filter(_variableDesign =>
      this.utilsService.fn_normalize(_variableDesign.variable.name.toLowerCase()).indexOf(filterValue) !== -1
    );
  }

  fn_display(variableDesign?: VariableDesign): string | undefined {
    return variableDesign && variableDesign.variable ? variableDesign.variable.name : undefined;
  }

  fn_optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.update.emit(event.option.value);
  }

  /**
   * For validations
   */

  get variableDesign() {
    return this.parentForm.get('variableDesign');
  }

  /**
   * New variable
   */
  fn_openDialogForNew(): void {
    this.ruleVariableDialogService.open(null,
      {
        designId: this.designId,
        windowId: this.windowId,
        source: this.source,
        type: this.type,
        scope: this.scope
      });
  }
}
