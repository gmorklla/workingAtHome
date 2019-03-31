import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderButtonComponent } from './render-button.component';

describe('RenderButtonComponent', () => {
  let component: RenderButtonComponent;
  let fixture: ComponentFixture<RenderButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
