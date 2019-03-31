import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FlowService} from '../../services/flow.service';
import {Flow} from '../../models/flow.model';
import {AlertService} from '../../../../../campaigns/src/lib/services/alert/alert.service';

@Component({
  selector: 'lib-edit-flow',
  templateUrl: './edit-flow.component.html',
  styleUrls: ['./edit-flow.component.css']
})
export class EditFlowComponent implements OnInit {

  private flowId: string;
  public flow: Flow;

  constructor(private route: ActivatedRoute,
              private flowService: FlowService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.fn_getFlow();
  }

  private fn_getFlow(): void {
    this.route.url.subscribe(url => {
      this.flowId = this.route.snapshot.paramMap.get('flowId');
    });
    console.log(this.flowId);

    this.flowService.fn_get(this.flowId).subscribe({
      next: (result) => {
        console.log('[RESPONSE]', result);
        this.flow = result;
      },
      error: (error: any) => {
        console.log(error);
        // this.alertasService.operacionFallida(error.message);
      },
      complete: () => {
        console.log('OK');
      }
    })
  }

  fn_update(flow: Flow): void {
    this.flowService.fn_update(flow).subscribe({
      next: (result: Flow) => {
        console.log('[RESPONSE]', result);
        if (result && result.id) {
          this.alertService.fn_successSave();
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
