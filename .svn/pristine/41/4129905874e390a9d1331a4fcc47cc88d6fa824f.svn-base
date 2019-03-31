import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ChannelGroup} from '../../../../../campaigns/src/lib/models/channel.group.model';
import {LinkedChannelStatus} from '../../../../../campaigns/src/lib/models/linked.channel.status.model';
import {ChannelService} from '../../../../../campaigns/src/lib/services/channel.service';
import {LinkedChannelService} from '../../../../../campaigns/src/lib/services/linked-channel.service';
import {Channel} from '../../../../../campaigns/src/lib/models/channel.model';

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() public filterChange = new EventEmitter();

  public mainForm: FormGroup;

  listChannelGroups: ChannelGroup[];
  listLinkedChannelStatus: LinkedChannelStatus[];

  constructor(private formBuilder: FormBuilder,
              private channelService: ChannelService,
              private linkedChannelService: LinkedChannelService) {
    this.createMainForm();
  }

  ngOnInit() {
    this.fn_getAllChannel();
    this.fn_getAllLinkedChannelStatus();
  }

  private createMainForm(): void {
    this.mainForm = this.formBuilder.group({
      'idChannel': new FormControl(''),
      'status': new FormControl('')
    });
  }

  private fn_getAllChannel(): void {
    this.channelService.fn_getAll().subscribe({
      next: (result: Channel[]) => {
        console.log('[RESPONSE]', result);
        this.fn_groupChannels(result);
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

  private fn_groupChannels(channels: Channel[]): void {
    this.listChannelGroups = [];
    channels.forEach((channel: Channel) => {
      let found = false;
      this.listChannelGroups.forEach((channelGroup: ChannelGroup) => {
        if (channelGroup.name === channel.descriptionChannel) {
          channelGroup.channels.push(channel);

          found = true;
          return;
        }
      });

      if (!found) {
        const channelGroup = new ChannelGroup();
        channelGroup.name = channel.descriptionChannel;
        channelGroup.channels = [channel];
        this.listChannelGroups.push(channelGroup);
      }
    });
  }

  private fn_getAllLinkedChannelStatus(): void {
    this.linkedChannelService.fn_getAllLinkedChannelStatus().subscribe({
      next: (result: LinkedChannelStatus[]) => {
        console.log('[RESPONSE] ', result);
        this.listLinkedChannelStatus = result;
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

  fn_filterChange(): void {
    this.filterChange.emit();
  }

  fn_reset(): void {
    this.mainForm.patchValue({
      'idChannel': '',
      'status': ''
    });
  }
}
