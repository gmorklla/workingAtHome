import {Component, OnInit, ViewChild} from '@angular/core';
import {Day} from '../../../campaigns/src/lib/models/configuration/day.model';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {LinkedChannel} from '../../../campaigns/src/lib/models/linked.channel.model';
import {LinkedChannelService} from '../../../campaigns/src/lib/services/linked-channel.service';
import {ConfigurationService} from '../../../campaigns/src/lib/services/configuration.service';
import {AlertService} from '../../../campaigns/src/lib/services/alert/alert.service';
import {LinkedChannelDialogComponent} from '../../../campaigns/src/lib/components/dialog/linked-channel-dialog/linked-channel-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Channel} from '../../../campaigns/src/lib/models/channel.model';
import {FilterComponent} from './components/filter/filter.component';
import {FlowService} from './services/flow.service';
import {Flow} from './models/flow.model';
import {UtilsService} from '../../../campaigns/src/lib/services/utils/utils.service';
import {Messages} from '../../../banorte/src/app/shared/messages';

@Component({
  selector: 'lib-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FlowsComponent implements OnInit {

  private listDays: Day[];

  dataSource: MatTableDataSource<Flow>;
  columnsToDisplay = ['select', 'name', 'description', 'channels', 'startDate', 'endDate', 'status', 'edit'];
  expandedElement: Flow | null;

  /**
   * Selector
   */
  selection = new SelectionModel<Flow>(true, []);

  /**
   * Pagination
   */
  private INIT_PAGE_INDEX = 1;

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;

  /**
   * Filter
   */
  hiddenFilter = true;
  search: string;
  idChannel: string;
  @ViewChild(FilterComponent) filter: FilterComponent;

  /**
   * Expanded or collapsed
   */
  idChannelCopy: string;
  listFlowsForExpanded: Flow[];
  listLinkedChannelForUpdate: LinkedChannel[];
  listLinkedChannelForNewLink: LinkedChannel[];

  constructor(private flowService: FlowService,
              private linkedChannelService: LinkedChannelService,
              private configurationService: ConfigurationService,
              private dialog: MatDialog,
              private alertService: AlertService,
              private utilsService: UtilsService) {
    this.search = '';
    this.listFlowsForExpanded = [];
    this.listLinkedChannelForUpdate = [];
    this.listLinkedChannelForNewLink = [];
  }

  ngOnInit() {
    this.fn_pageAll();
    this.fn_getAllDays();
  }

  fn_pageAll(): void {
    // Filter
    this.idChannel = this.filter.mainForm.value.idChannel;
    if (this.idChannel === null || this.idChannel == undefined) {
      this.idChannel = '';
    }
    this.idChannelCopy = this.idChannel;

    let status = this.filter.mainForm.value.status;
    if (status === null || status == undefined) {
      status = '';
    }

    // Selection
    this.selection.clear();

    // Pagination
    let page = this.INIT_PAGE_INDEX;
    let pageSize = this.pageSize;
    if (this.pageEvent) {
      page = this.pageEvent.pageIndex + 1;
      pageSize = this.pageEvent.pageSize;
    }

    this.flowService.fn_pageAll(this.search, this.idChannel, status, page, pageSize).subscribe({
      next: (result: Flow[]) => {
        console.log('[RESPONSE]', result);
        this.dataSource = new MatTableDataSource<Flow>(result);
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG016_FLOW_GET_PAGE_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    });

    this.flowService.fn_pageCount(this.search, this.idChannel, status).subscribe({
      next: (result: number) => {
        console.log('[RESPONSE]', result);
        this.length = result;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG017_FLOW_GET_PAGE_COUNT_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    });
  }

  private fn_getAllDays(): void {
    this.configurationService.fn_getAllDays().subscribe({
      next: (result: Day[]) => {
        console.log('[RESPONSE]', result);
        this.listDays = result;
      },
      error: (error: any) => {
        console.log(error);
        // this.alertasService.operacionFallida(error.message);
      },
      complete: () => {
        console.log('OK');
      }
    });
  }

  /**
   * Personalize columns
   */
  fn_getCountLinkedChannels(listLinkedChannels: LinkedChannel[]): number {
    return listLinkedChannels ? listLinkedChannels.length : 0;
  }

  /**
   * Selection
   * @returns {boolean}
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Filter
   * @param {string} filterValue
   */
  fn_filterChange(): void {
    this.paginator.firstPage();

    this.fn_pageAll();
  }

  /**
   * Expanded or collapsed
   */
  fn_isExpanded(flow: Flow): boolean {
    let expanded = false;
    // By channel
    if (this.idChannelCopy !== '') {
      expanded = true;
    }

    // By link
    if (!expanded) {
      this.listFlowsForExpanded.forEach((flowExpanded) => {
        if (flow.id === flowExpanded.id) {
          expanded = true;
          return false;
        }
      });
    }
    return expanded;
  }

  fn_resetExpendedList(): void {
    this.idChannelCopy = '';
    this.listFlowsForExpanded = [];
  }

  /**
   * Actions
   */
  fn_refresh(): void {
    this.search = '';
    this.filter.fn_reset();
    this.fn_resetExpendedList();

    this.fn_pageAll();
  }

  /**
   * Linked channels
   */
  fn_openDialogForLink(): void {
    const dialogRef = this.dialog.open(LinkedChannelDialogComponent, {
      width: '1000px',
      data: {listChannelGroups: this.filter.listChannelGroups, listProcesses: this.selection.selected}
    });

    dialogRef.afterClosed().subscribe((result: Channel[]) => {
      if (result !== undefined) {
        this.fn_linkedChannels(result);
      }
    });
  }

  private fn_linkedChannels(listChannels: Channel[]): void {
    this.listFlowsForExpanded.length = 0;
    this.listLinkedChannelForUpdate.length = 0;
    this.listLinkedChannelForNewLink.length = 0;
    let existsNewLinks = false;

    const listSelectedFlows = this.selection.selected;
    listSelectedFlows.forEach((flow: Flow) => {
      if (!flow.listLinkedChannels) {
        flow.listLinkedChannels = [];
      }
      let existsNewLinksForFlow = false;
      listChannels.forEach((channel: Channel) => {
        let existsChannel = this.existsChannel(flow.listLinkedChannels, channel);
        if (!existsChannel) {
          const linkedChannel = new LinkedChannel();
          linkedChannel.idReferential = flow.id;
          linkedChannel.channel = channel;

          flow.listLinkedChannels.push(linkedChannel);
          this.listLinkedChannelForUpdate.push(linkedChannel)
          this.listLinkedChannelForNewLink.push(linkedChannel);
          existsNewLinksForFlow = true;
        }
      });

      if (existsNewLinksForFlow) {
        existsNewLinks = true;
      }
      this.listFlowsForExpanded.push(flow);
    });
    console.log(listSelectedFlows);

    if (existsNewLinks) {
      this.linkedChannelService.fn_linkFlows(listSelectedFlows).subscribe({
        next: (result: boolean) => {
          console.log('[RESPONSE]', result);
          if (result) {
            this.alertService.fn_success('Vinculación completa');
          }

          this.fn_pageAll();
        },
        error: (error: any) => {
          console.log(error);
          this.alertService.fn_error('Lo siento, no es posible realizar la vinculación');
        },
        complete: () => {
          console.log('OK');
        }
      });
    }
  }

  private existsChannel(listLinkedChannels: LinkedChannel[], channel: Channel): boolean {
    let found = false;
    listLinkedChannels.forEach((linkedChannel) => {
      if (linkedChannel.channel.idSubChannel === channel.idSubChannel) {
        found = true;
        return false;
      }
    });
    return found;
  }
}
