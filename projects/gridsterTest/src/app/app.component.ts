import { Component, OnInit } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridType,
  DisplayGrid
} from 'angular-gridster2';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { opts1, opts2 } from './optionsExe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  optsDef = {
    gridType: GridType.VerticalFixed,
    gridSizeChangedCallback: AppComponent.gridResize,
    itemChangeCallback: AppComponent.itemChange,
    itemResizeCallback: AppComponent.itemResize
  };

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    // console.log('itemResized', item, itemComponent);
  }

  static gridResize(gridComp) {
    console.log('gridResize', gridComp);
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large
      ])
      .subscribe(result => {
        console.log('result', result);
        this.changeOptionsOfGrid(result);
      });
  }

  ngOnInit() {
    this.options = { ...this.optsDef, ...opts1 };
    this.dashboard = [
      { cols: 1, rows: 1, y: 2, x: 1, type: 'input' },
      { cols: 1, rows: 1, y: 3, x: 1, type: 'input' },
      { cols: 1, rows: 1, y: 2, x: 2, type: 'input' },
      { cols: 1, rows: 1, y: 3, x: 2, type: 'input' },
      { cols: 1, rows: 1, y: 4, x: 2, type: 'image' }
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    // this.dashboard.push({});
  }

  changeOptionsOfGrid(result: BreakpointState) {
    if (
      result.breakpoints['(max-width: 599.99px) and (orientation: portrait)']
    ) {
      this.options = { ...this.optsDef, ...opts2 };
      this.dashboard = [
        { cols: 2, rows: 1, y: 2, x: 0, type: 'input' },
        { cols: 2, rows: 1, y: 3, x: 0, type: 'input' },
        { cols: 2, rows: 1, y: 4, x: 0, type: 'input' },
        { cols: 2, rows: 1, y: 5, x: 0, type: 'input' },
        { cols: 1, rows: 1, y: 11, x: 1, type: 'image' }
      ];
    } else if (
      result.breakpoints['(min-width: 960px) and (max-width: 1279.99px)']
    ) {
      this.options = { ...this.optsDef, ...opts1 };
      this.dashboard = [
        { cols: 1, rows: 1, y: 2, x: 1, type: 'input' },
        { cols: 1, rows: 1, y: 3, x: 1, type: 'input' },
        { cols: 1, rows: 1, y: 2, x: 2, type: 'input' },
        { cols: 1, rows: 1, y: 3, x: 2, type: 'input' },
        { cols: 1, rows: 1, y: 4, x: 2, type: 'image' }
      ];
    }
  }
}
