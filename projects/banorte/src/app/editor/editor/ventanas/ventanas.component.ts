import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { target } from '../../../shared/data/port';

export class WindowNode {
  name: string;
  windowId: string;
  id: number;
  width?: number;
  height?: number;
  controls?: Array<any>;
  attributes?: Object;
  designId?: string;
  type?: string;
  children?: WindowNode[];
}

@Component({
  selector: 'app-ventanas',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.css']
})
export class VentanasComponent implements OnInit {
  treeData: WindowNode;
  designId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpCallService
  ) {}

  ngOnInit() {
    this.designId = this.route.snapshot.paramMap.get('designId');
    this.getTreeData();
  }

  reRender(e) {
    console.log('reRender in ventanas', e);
    this.getTreeData();
  }

  getTreeData() {
    // Settings para ng2 tree
    const treeSettings = {
      rightMenu: false,
      cssClasses: {
        expanded: 'nodeExpanded',
        collapsed: 'nodeCollapsed',
        leaf: 'nodeLeaf',
        empty: 'nodeEmpty'
      }
    };
    const url = `${target}design/${this.designId}/tree`;
    this.http.getRequest(url, {}).subscribe(tree => {
      tree[0].settings = treeSettings;
      this.treeData = tree[0];
    });
  }

  navigate(e) {
    this.router.navigate([`/layout/design/${this.designId}/window/${e.id}`]);
  }
}
