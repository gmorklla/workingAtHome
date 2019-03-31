import { Component, OnInit, Input } from '@angular/core';
import { ComponentesDinamicosService } from '../../../shared/services/componentes-dinamicos.service';

@Component({
  selector: 'app-template-placeholder',
  template: `
    <div>Placeholder</div>
  `,
  styles: ['']
})
export class TemplatePlaceholderComponent {
  constructor() {}
}

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css'],
  providers: [ComponentesDinamicosService]
})
export class DinamicoComponent implements OnInit {
  @Input() control;

  constructor() {}

  ngOnInit() {}
}
