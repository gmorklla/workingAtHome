import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  user: Observable<any>;
  @Input()
  sections: Array<Section>;
  @Input()
  themes: Array<Theme>;
  @Output()
  selectTheme = new EventEmitter<number>();
  @Output()
  menuEvent = new EventEmitter<string>();
  @Output()
  submenuEvent = new EventEmitter<string>();
  title = '';
  submenu = [];

  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(e => e['url'].slice(1)),
        tap(val => {
          const section = this.sections.find(
            sec => sec.name.toLowerCase() === val
          );
          this.submenu = section ? section.submenu : [];
        })
      )
      .subscribe(val => (this.title = val !== '' ? val : 'Login'));
  }

  setTheme(theme: number) {
    this.selectTheme.emit(theme);
  }

  submenuCFn(option) {
    this.submenuEvent.emit(option.name);
  }

  navigate(section) {
    this.menuEvent.emit(section);
  }
}

export interface Section {
  name: string;
  icon: string;
  url: string;
  submenu: Array<{ name: string; icon: string }>;
}

export interface Theme {
  name: string;
  value: number;
  color: string;
}
