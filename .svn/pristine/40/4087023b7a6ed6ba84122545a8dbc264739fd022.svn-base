import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {ServiceDesign} from '../../../models/service/service-design.model';
import {FormControl} from '@angular/forms';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {UtilsService} from '../../../../../../../campaigns/src/lib/services/utils/utils.service';
import {ServiceDesignService} from '../../../services/service/service-design.service';
import {Messages} from '../../../../shared/messages';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmationDialogComponent} from '../../../../../../../campaigns/src/lib/components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rule-service-table',
  templateUrl: './rule-service-table.component.html',
  styleUrls: ['./rule-service-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RuleServiceTableComponent implements OnInit {

  @Input() private designId: string;
  @Input() private windowId: string;

  search = new FormControl('');

  dataSource: MatTableDataSource<ServiceDesign>;
  displayedColumns: string[] = ['id', 'description', 'dataSource', 'operation', 'status', 'endUpdateDate', 'delete'];
  expandedElement: ServiceDesign | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serviceDesignService: ServiceDesignService,
              private alertService: AlertService,
              private utilsService: UtilsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fn_getAllServiceDesign();
  }

  private fn_getAllServiceDesign(): void {
    this.serviceDesignService.fn_getAll(this.designId).subscribe({
      next: (result: ServiceDesign[]) => {
        console.log('[RESPONSE]', result);

        this.dataSource = new MatTableDataSource<ServiceDesign>(result);
        this.dataSource.filterPredicate = (serviceDesign: ServiceDesign, filterValue: string) => {
          const _filterValue = this.utilsService.fn_normalize(filterValue.trim());
          const _serviceDescription = this.utilsService.fn_normalize(serviceDesign.description.trim());

          return _serviceDescription.toLowerCase().indexOf(_filterValue) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG_RULE_SERVICE_GET_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fn_resetFilter(): void {
    this.search.patchValue('');
    this.applyFilter('');
  }

  fn_applySort(sort: Sort): void {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data.sort((a, b) => {
        return this.utilsService.fn_compare(a.id, b.id, true);
      });
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.utilsService.fn_compare(a.id, b.id, isAsc);
        case 'description': return this.utilsService.fn_compare(a.description, b.description, isAsc);
        case 'dataSource': return this.utilsService.fn_compare(a.dataSource.nombre, b.dataSource.nombre, isAsc);
        default: return 0;
      }
    });
  }

  fn_refresh(): void {
    this.fn_getAllServiceDesign();
    this.fn_resetFilter();
  }

  /**
   * Delete service
   */
  fn_openDialogForDelete(serviceDesign: ServiceDesign): void {
    console.log('serviceDesign: ', serviceDesign);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Eliminar',
        info: 'El servicio configurado para <strong>' + serviceDesign.description + '</strong> será eliminado'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.serviceDesignService.fn_delete(serviceDesign).subscribe({
          next: (result: boolean) => {
            console.log('[RESPONSE]', result);
            if (result === true) {
              this.alertService.fn_success(Messages.MSG_RULE_SERVICE_DELETE_SUCCESS);
            } else {
              this.alertService.fn_error(Messages.MSG_RULE_SERVICE_DELETE_ERROR);
            }

            this.fn_refresh();
          },
          error: (error: any) => {
            console.log(error);
            this.alertService.fn_error(Messages.MSG_RULE_SERVICE_DELETE_ERROR);
          },
          complete: () => {
            console.log('OK');
          }
        });
      }
    });
  }
}
