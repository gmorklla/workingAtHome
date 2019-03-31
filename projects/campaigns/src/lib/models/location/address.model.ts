import {Colony} from './colony.model';
import {Town} from './town.model';
import {State} from './state.model';

export class Address {
  street: string;
  colony: Colony;
  town: Town;
  state: State;
  zipCode: string;
  latitude: string;
  longitude: string;
}
