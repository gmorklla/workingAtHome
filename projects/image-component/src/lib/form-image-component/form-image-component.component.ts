import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
  mergeMap
} from 'rxjs/operators';
import { of, iif, fromEvent, Observable } from 'rxjs';
import { ControlesI } from 'projects/banorte/src/app/shared/data/data';
import { ImageComponentService } from '../image-component.service';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'lib-form-image-component',
  templateUrl: './form-image-component.component.html',
  styleUrls: ['./form-image-component.component.css']
})
export class FormImageComponentComponent implements OnInit {
  stylesContainerForm: FormGroup;
  toCompare: string;
  imageSizeSet: boolean;
  @Input() control: ControlesI;
  @Output() propChange = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: ImageComponentService,
    private emitterS: EventEmitterService
  ) {
    this.imageSizeSet = true;
    const attrOpts = {
      source: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      x: ['', [Validators.required]],
      y: ['', [Validators.required]]
    };
    this.stylesContainerForm = this.fb.group(attrOpts);
    this.stylesContainerForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        filter(val => JSON.stringify(val) !== this.toCompare),
        tap(val => {
          this.toCompare = JSON.stringify(val);
          if (!this.imageSizeSet) {
            this.setNewSourceSize();
          }
          const { width, height, x, y, source } = val;
          const style = {
            width: width,
            height: height,
            x: x,
            y: y
          };
          const formatted = this.formatToEmit(style);
          const attrs = [{ src: source }];
          this.propChange.emit({ estilos: formatted, attrs: attrs });
        })
      )
      .subscribe(_ => {});
    this.stylesContainerForm.get('source').valueChanges.subscribe(src => {
      this.imageSizeSet = false;
      console.log('src change', src);
    });
  }

  ngOnInit() {
    this.setFormValues();
    this.emitterS.catalogImageEvent.subscribe((url: string) =>
      this.stylesContainerForm.patchValue({ source: url })
    );
  }

  setNewSourceSize() {
    const newImg = new Image();
    newImg.src = this.stylesContainerForm.get('source').value;
    fromEvent(newImg, 'load').subscribe(val => {
      this.stylesContainerForm.patchValue({ width: val['path'][0].width });
      this.stylesContainerForm.patchValue({ height: val['path'][0].height });
    });
  }

  setFormValues(event?: any) {
    let source;
    let sourceF = source ? source : 'http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-managment/assets/images/banorteLogo.jpg';

    if (event !== undefined) {
      sourceF = event.target.value;
      this.stylesContainerForm.get('source').setValue(sourceF);
    } else {
      source = this.control.attributes['src'];
      sourceF = source ? source : 'http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-managment/assets/images/banorteLogo.jpg';
    }

    const styleObj = this.control.attributes['style']
      ? this.service.stringToObj(this.control.attributes['style'])
      : {};
    let {
      width = '100',
      height = '100',
      transform = 'translate3d(0,0,0)'
    } = styleObj;
    const coords = transform
      .slice(transform.indexOf('(') + 1, transform.indexOf(')'))
      .split(',');
    const x = this.getNumValueNoPX(coords[0]);
    const y = this.getNumValueNoPX(coords[1]);
    if (!width) {
      this.setNewSourceSize();
    }
    width = width ? this.getNumValueNoPX(width) : '100';
    height = height ? this.getNumValueNoPX(height) : '100';
    this.stylesContainerForm.setValue(
      {
        source: sourceF,
        width: width,
        height: height,
        x: x,
        y: y
      },
      { emitEvent: false }
    );
  }

  updateSrc(event?: any) {
    if (event !== undefined) {
      this.stylesContainerForm.get('source').setValue(event.target.value);
    }
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }

  deleteItem(e) {
    const confirmP = confirm('¿Quieres borrar este ' + this.control.type + '?');
    const delete$ = of(true).pipe(
      tap(val => this.propChange.emit({ delete: this.control }))
    );
    const x$ = of('X');
    of(confirmP)
      .pipe(mergeMap(val => iif(() => val, delete$, x$)))
      .subscribe(_ => {});
  }

  formatToEmit(estilos) {
    const { x, y } = estilos;
    const transform = `translate3d(${x}px,${y}px,0)`;
    const copiaEstilos = { ...estilos };
    delete copiaEstilos.x;
    delete copiaEstilos.y;
    copiaEstilos.transform = transform;
    copiaEstilos.width = `${copiaEstilos.width}px`;
    copiaEstilos.height = `${copiaEstilos.height}px`;
    return copiaEstilos;
  }
}
