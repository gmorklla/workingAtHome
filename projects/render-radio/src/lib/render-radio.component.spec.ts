import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderRadioComponent } from './render-radio.component';

describe('RenderRadioComponent', () => {
  let component: RenderRadioComponent;
  let fixture: ComponentFixture<RenderRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
