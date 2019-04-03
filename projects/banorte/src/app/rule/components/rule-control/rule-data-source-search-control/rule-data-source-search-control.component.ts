import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataSourceService} from '../../../services/service/dataSource/data-source.service';
import {DataSource} from '../../../models/service/dataSource/data-source.model';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {Messages} from '../../../../shared/messages';
import {Observable} from 'rxjs/Rx';
import {map, startWith} from 'rxjs/internal/operators';
import {UtilsService} from '../../../../../../../campaigns/src/lib/services/utils/utils.service';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-rule-data-source-search-control',
  templateUrl: './rule-data-source-search-control.component.html',
  styleUrls: ['./rule-data-source-search-control.component.css']
})
export class RuleDataSourceSearchControlComponent implements OnInit {

  @Input() public parentForm: FormGroup;

  @Output() public update = new EventEmitter();

  public listDataSource: DataSource[];
  public filteredDataSource: Observable<DataSource[]>;

  constructor(private dataSourceService: DataSourceService,
              private alertService: AlertService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.fn_getAllDataSource();
  }

  private fn_getAllDataSource(): void {
    this.dataSourceService.fn_getAll().subscribe({
      next: (result: DataSource[]) => {
        console.log('[RESPONSE]', result);
        this.listDataSource = result;

        this.filteredDataSource = this.parentForm.controls.dataSource.valueChanges
          .pipe(
            startWith(''),
            map(search => search ? this.fn_filter(search) : this.listDataSource.slice())
          );
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG014_RULE_DATA_SOURCE_GET_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    })
  }

  private fn_filter(search: any): DataSource[] {
    let filterValue;
    if (search instanceof DataSource || search.nombre) {
      filterValue = search.nombre;
    } else {
      filterValue = search;
    }
    filterValue = this.utilsService.fn_normalize(filterValue.toLowerCase());

    return this.listDataSource.filter(_dataSource =>
      this.utilsService.fn_normalize(_dataSource.nombre.toLowerCase()).indexOf(filterValue) !== -1
    );
  }

  fn_display(dataSource?: DataSource): string | undefined {
    return dataSource ? dataSource.nombre : undefined;
  }

  fn_optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.update.emit(event.option.value);
  }

  /**
   * For validations
   */

  get dataSource() {
    return this.parentForm.get('dataSource');
  }
}
