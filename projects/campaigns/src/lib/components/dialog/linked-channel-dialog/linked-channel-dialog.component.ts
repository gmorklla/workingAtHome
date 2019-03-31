import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Channel} from '../../../models/channel.model';
import {ChannelGroup} from '../../../models/channel.group.model';
import {LinkedChannel} from '../../../models/linked.channel.model';
import {Process} from '../../../models/process.interface';

export interface LinkedChannelDialogData {
  listChannelGroups: ChannelGroup[];
  listProcesses: Process[];
}

@Component({
  selector: 'lib-linked-channel-dialog',
  templateUrl: './linked-channel-dialog.component.html',
  styleUrls: ['./linked-channel-dialog.component.css']
})
export class LinkedChannelDialogComponent implements OnInit {

  listChannelSelecteds: Channel[];

  constructor(public dialogRef: MatDialogRef<LinkedChannelDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: LinkedChannelDialogData) {}

  ngOnInit() {
    this.listChannelSelecteds = [];
  }

  /**
   * @condition Only available for one process
   */
  fn_isChecked(channel: Channel): boolean {
    let checked = false;
    if (this.data.listProcesses.length === 1) {
      this.data.listProcesses.forEach((process) => {
        const listLinkedChannels = process.listLinkedChannels;
        if (listLinkedChannels) {
          listLinkedChannels.forEach((linkedChannel) => {
            if (linkedChannel.channel.idSubChannel === channel.idSubChannel) {
              checked = true;
              return false;
            }
          });
          if (checked) {
            return false;
          }
        }
      });
    }
    return checked;
  }

  fn_countChannelSelected(channel: Channel): number {
    let count = 0;
    this.data.listProcesses.forEach((process) => {
      if (process.listLinkedChannels) {
        process.listLinkedChannels.forEach((linkedChannel: LinkedChannel) => {
          if (channel.idSubChannel === linkedChannel.channel.idSubChannel) {
            count++;
            return false;
          }
        });
      }
    });
    channel.count = count;
    return count;
  }

  fn_onChange(event: any, channel: Channel): void {
    if (event.checked) {
      this.listChannelSelecteds.push(channel);
    } else {
      this.listChannelSelecteds.forEach((channelSelected, index) => {
        if (channelSelected.idSubChannel === channel.idSubChannel) {
          console.log('Remove channel: ', channelSelected);
          this.listChannelSelecteds.splice(index, 1);
          return false;
        }
      });
    }
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }
}
