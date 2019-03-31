import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'projects/http-call/src/public_api';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  queryForm: FormGroup;
  terms: Array<string> = ['measurement', 'moid', 'nedn'];
  list: Array<string> = [];
  filteredList: Observable<string[]>;
  queries: Array<Query> = [];

  constructor(
    private snack: SnackBarService,
    private http: HttpCallService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const queryBuilderOpts = {
      termCtrl: ['', [Validators.required]],
      listCtrl: ['', [Validators.required]],
      list: [[]]
    };
    this.queryForm = this.fb.group(queryBuilderOpts, {
      validator: SelectedValidation
    });
    this.queryForm
      .get('termCtrl')
      .valueChanges.pipe(switchMap(term => this.getDistinct(term)))
      .subscribe(val => {
        this.list = val;
        this.queryForm.controls['list'].setValue(val);
      });
    this.filteredList = this.queryForm.get('listCtrl').valueChanges.pipe(
      startWith(''),
      map(val => (val ? this._filter(val) : this.list.slice()))
    );
  }

  getDistinct(term): Observable<any> {
    const endpoint = 'http://localhost:3000/distinct';
    const params = { term: term };
    return this.http.getRequest(endpoint, params);
  }

  _filter(value: string): string[] {
    const reg = new RegExp(value, 'ig');
    return this.list.filter(val => reg.test(val));
  }

  addFilter() {
    const type = this.queryForm.get('termCtrl').value;
    const toPush = { type: type, value: this.queryForm.get('listCtrl').value };
    const clone = [...this.queries];
    // Validate that is not already on the list of queries
    const regEx = new RegExp('^' + toPush.value + '$');
    const validation = clone.find(query => regEx.test(query.value));
    if (!validation) {
      clone.push(toPush);
      this.queries = [...clone];
    } else {
      this.snack.open('Already added', 'Ok');
    }
  }

  find() {
    const filterQuery = JSON.stringify({
      moid: 'PlatformMeasures=/dev/mapper/DrbdVg-DrbdLv, Source = io2',
      measurement: 'DiskUsage'
    });
    const project = JSON.stringify({ _id: 0 });
    const endpoint = 'http://localhost:3000/find';
    const params = { filter: filterQuery, project: project };
    this.http.getRequest(endpoint, params).subscribe(data => {
      console.log(data);
    });
  }
}

export function SelectedValidation(control: AbstractControl) {
  const list = control.get('list').value;
  const toValidate = control.get('listCtrl').value;
  const regEx = new RegExp('^' + toValidate + '$');
  const validation = list.find(val => regEx.test(val));
  return validation ? null : { selected: true };
}

export interface Query {
  type: string;
  value: string;
}
