import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  iframe_html: any;
  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';
  width = 300;
  height = 200;
  options: { [key: string]: any };
  panel = 'panelExe';
  sValue;
  foods: Food[] = [
    { value: 'red', viewValue: 'Red' },
    { value: 'green', viewValue: 'Green' },
    { value: 'blue', viewValue: 'Blue' }
  ];

  constructor(private embedService: EmbedVideoService) {}

  ngOnInit() {
    this.options = {
      query: { portrait: 0, color: '333' },
      attr: { width: '100%', height: '100%' }
    };
    this.youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';
    this.iframe_html = this.embedService.embed(this.youtubeUrl, this.options);
  }

  setYTUrl() {
    this.youtubeUrl =
      this.youtubeUrl === 'https://www.youtube.com/watch?v=iHhcHTlGtRs'
        ? 'https://www.youtube.com/watch?v=3RB7ch_6zK0'
        : 'https://www.youtube.com/watch?v=iHhcHTlGtRs';
    this.iframe_html = this.embedService.embed(this.youtubeUrl, this.options);
  }

  onResizeStop(e) {
    this.width = e.size.width;
    this.height = e.size.height;
    // this.rzStopE.emit(e.size);
  }
}
