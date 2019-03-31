import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBusService } from './shared/services/data-bus.service';
import { AuthService } from './shared/services/auth.service';
import { sections, themes } from './shared/config/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('container')
  container: ElementRef;
  title = 'ims';
  sections = sections;
  themes = themes;
  user: Observable<any>;
  theme = '';

  constructor(
    private dataBus: DataBusService,
    private auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user$;
    this.dataBus.setContentHeight(
      this.container.nativeElement.clientHeight - 138
    );
  }

  selectTheme(e) {
    switch (e) {
      case 1:
        this.theme = '';
        break;
      case 2:
        this.theme = 'alternate-theme';
        break;
      default:
        break;
    }
  }

  submenuEvent(e) {
    this.dataBus.submenuEvent(e);
  }

  menuEvent(e) {
    this._router.navigateByUrl(e);
  }
}
