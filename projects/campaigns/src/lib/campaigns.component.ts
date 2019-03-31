import {Component, OnInit, ViewChild} from '@angular/core';
import {CampaignService} from './services/campaign.service';
import {Campaign} from './models/campaign.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {FilterComponent} from './components/filter/filter.component';
import {LinkedChannelDialogComponent} from './components/dialog/linked-channel-dialog/linked-channel-dialog.component';
import {Channel} from './models/channel.model';
import {LinkedChannel} from './models/linked.channel.model';
import {LinkedChannelService} from './services/linked-channel.service';
import {Day} from './models/configuration/day.model';
import {ConfigurationService} from './services/configuration.service';
import {LinkedChannelStatusConstant} from './models/constants/linked.channel.status.constant';
import {AlertService} from './services/alert/alert.service';
import {UtilsService} from './services/utils/utils.service';

@Component({
  selector: 'lib-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CampaignsComponent implements OnInit {

  private listDays: Day[];

  dataSource: MatTableDataSource<Campaign>;
  columnsToDisplay = ['select', 'code', 'name', 'offer', 'channels', 'startDate', 'endDate', 'status'];
  expandedElement: Campaign | null;

  /**
   * Selector
   */
  selection = new SelectionModel<Campaign>(true, []);

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
  listCampaignsForExpanded: Campaign[];
  listLinkedChannelForUpdate: LinkedChannel[];
  listLinkedChannelForNewLink: LinkedChannel[];

  constructor(private campaignService: CampaignService,
              private linkedChannelService: LinkedChannelService,
              private configurationService: ConfigurationService,
              private dialog: MatDialog,
              private alertService: AlertService,
              private utilsService: UtilsService) {
    this.search = '';
    this.listCampaignsForExpanded = [];
    this.listLinkedChannelForUpdate = [];
    this.listLinkedChannelForNewLink = [];
  }

  ngOnInit() {
    this.fn_pageAll();
    this.fn_getAllDays();
  }

  fn_pageAll(): void {
    // Filter
    let campaignCode = this.filter.mainForm.value.campaignCode;
    if (campaignCode === null || campaignCode == undefined) {
      campaignCode = '';
    }

    let offerCode = this.filter.mainForm.value.offerCode;
    if (offerCode === null || offerCode == undefined) {
      offerCode = '';
    }

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

    this.campaignService.fn_pageAll(this.search, campaignCode, offerCode, this.idChannel, status, page, pageSize).subscribe({
      next: (result: Campaign[]) => {
        console.log('[RESPONSE]', result);
        this.dataSource = new MatTableDataSource<Campaign>(result);
      },
      error: (error: any) => {
        console.log(error);
        // this.alertasService.operacionFallida(error.message);
      },
      complete: () => {
        console.log('OK');
      }
    });

    this.campaignService.fn_pageCount(this.search, campaignCode, offerCode, this.idChannel, status).subscribe({
      next: (result: number) => {
        console.log('[RESPONSE]', result);
        this.length = result;
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
  fn_isExpanded(campaign: Campaign): boolean {
    let expanded = false;
    // By channel
    if (this.idChannelCopy !== '') {
      expanded = true;
    }

    // By link
    if (!expanded) {
      this.listCampaignsForExpanded.forEach((campaignExpanded) => {
        if (campaign.id === campaignExpanded.id) {
          expanded = true;
          return false;
        }
      });
    }
    return expanded;
  }

  fn_resetExpendedList(): void {
    this.idChannelCopy = '';
    this.listCampaignsForExpanded.length = 0;
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
    this.listCampaignsForExpanded.length = 0;
    this.listLinkedChannelForUpdate.length = 0;
    this.listLinkedChannelForNewLink.length = 0;
    let existsNewLinks = false;

    const listSelectedCampaigns = this.selection.selected;
    listSelectedCampaigns.forEach((campaign: Campaign) => {
      if (!campaign.listLinkedChannels) {
        campaign.listLinkedChannels = [];
      }
      let existsNewLinksForCampaign = false;
      listChannels.forEach((channel: Channel) => {
        let existsChannel = this.existsChannel(campaign.listLinkedChannels, channel);
        if (!existsChannel) {
          const linkedChannel = new LinkedChannel();
          linkedChannel.idReferential = campaign.id;
          linkedChannel.channel = channel;

          campaign.listLinkedChannels.push(linkedChannel);
          this.listLinkedChannelForUpdate.push(linkedChannel);
          this.listLinkedChannelForNewLink.push(linkedChannel);
          existsNewLinksForCampaign = true;
        }
      });

      if (existsNewLinksForCampaign) {
        existsNewLinks = true;
      }
      this.listCampaignsForExpanded.push(campaign);
    });
    console.log(listSelectedCampaigns);

    if (existsNewLinks) {
      this.linkedChannelService.fn_linkCampaigns(listSelectedCampaigns).subscribe({
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
