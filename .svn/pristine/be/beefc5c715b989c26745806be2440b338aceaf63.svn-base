import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ControlesI } from '../../../../shared/data/data';
import { target } from '../../../../shared/data/port';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, OnChanges {
  @Input() ctrl: ControlesI;
  designId: string;
  windowId: string;

  checked: boolean;

  constructor(
    private http: HttpCallService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.designId = this.route.snapshot.paramMap.get('designId');
    this.windowId = this.route.snapshot.paramMap.get('windowId');
    this.checked = this.ctrl
      ? this.ctrl.attributes['modalId']
        ? true
        : false
      : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ctrl) {
      this.checked = this.ctrl
        ? this.ctrl.attributes['modalId']
          ? true
          : false
        : false;
    }
  }

  checkChange(e) {
    const { id, name, type, attributes, options, tag } = this.ctrl;
    const body = {
      id: id,
      name: name,
      type: type,
      attributes: attributes,
      options: options,
      tag: tag
    };
    e.checked ? this.addModal(body) : this.removeModal(body);
  }

  addModal(obj) {
    const url = `${target}control/window/${this.windowId}/modal`;
    this.http
      .putRequest(url, obj, {})
      .subscribe(val =>
        this.router.navigate([
          `/layout/design/${this.designId}/window/${
            val['attributes']['modalId']
          }`
        ])
      );
  }

  removeModal(obj) {
    console.log('removeModal', obj);
  }

  editModalWindow(e) {
    this.router.navigate([
      `/layout/design/${this.designId}/window/${
        this.ctrl.attributes['modalId']
      }`
    ]);
  }
}
