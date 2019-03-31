import { Component, OnInit } from '@angular/core';
import {Flow} from '../../models/flow.model';
import {FlowService} from '../../services/flow.service';
import {AlertService} from '../../../../../campaigns/src/lib/services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {

  public flow: Flow;

  constructor(private flowService: FlowService,
              private alertService: AlertService,
              private router: Router) {
    this.flow = new Flow();
  }

  ngOnInit() {

  }

  fn_save(flow: Flow): void {
    this.flowService.fn_save(flow).subscribe({
      next: (result: Flow) => {
        console.log('[RESPONSE]', result);
        if (result && result.id) {
          this.alertService.fn_success('El flujo ha sido creado correctamente');
          this.router.navigate([`/flows`]);
        } else {
          this.alertService.fn_errorSave();
        }
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_errorSave();
      },
      complete: () => {
        console.log('OK');
      }
    })
  }
}
