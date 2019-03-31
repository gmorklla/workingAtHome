import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-content-cmp',
  templateUrl: './content-cmp.component.html',
  styleUrls: ['./content-cmp.component.css']
})
export class ContentCmpComponent implements OnInit {
  vamps = [
    { name: 'Bad Vamp' },
    { name: 'Petrovitch the Slain' },
    { name: 'Bob of the Everglades' },
    { name: 'The Optimistic Reaper' },
    { name: 'Dracula' },
    { name: 'Kurz' },
    { name: 'Vladislav' },
    { name: 'Deacon' }
  ];

  vamps2 = [];

  constructor(private dragulaService: DragulaService) {
    const options = {
      copy: (el, source) => {
        return source.id === 'left';
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      },
      copyItem: item => item,
      removeOnSpill: (el: Element, source: Element): boolean => {
        return source.id === 'left';
      }
    };
    this.dragulaService.createGroup('VAMPIRES', options);

    this.dragulaService.dropModel('VAMPIRES').subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit() {}

  onDrag(e, item) {
    console.log('dragging', item);
  }
}
