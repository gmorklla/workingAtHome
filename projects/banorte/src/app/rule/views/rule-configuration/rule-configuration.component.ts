import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RuleVariableComponent} from '../rule-variable/rule-variable.component';

@Component({
  selector: 'app-rule-configuration',
  templateUrl: './rule-configuration.component.html',
  styleUrls: ['./rule-configuration.component.css']
})
export class RuleConfigurationComponent implements OnInit {

  public designId: number;
  public windowId: number;

  @ViewChild(RuleVariableComponent) ruleVariableComponent: RuleVariableComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.designId = Number(this.route.snapshot.paramMap.get('designId'));
      console.log('Design ID: ', this.designId);

      this.windowId = Number(this.route.snapshot.paramMap.get('windowId'));
      console.log('Window ID: ', this.windowId);
    });
  }
}
