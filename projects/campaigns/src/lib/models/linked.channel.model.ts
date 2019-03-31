import {Channel} from './channel.model';
import {LinkedChannelStatus} from './linked.channel.status.model';
import {Configuration} from './configuration.model';
import {LinkedChannelDesign} from './linked.channel.design.model';

export class LinkedChannel {
  idReferential: string;
  channel: Channel;
  listConfigurationAttributes: any;
  listDesigns: LinkedChannelDesign[];
  status: LinkedChannelStatus;
  linkDate: Date;
  updateDate: Date;
  idConfiguration?: number;
  configuration: Configuration;
}
