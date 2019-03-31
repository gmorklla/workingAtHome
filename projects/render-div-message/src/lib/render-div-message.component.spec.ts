import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDivMessageComponent } from './render-div-message.component';

describe('RenderDivMessageComponent', () => {
  let component: RenderDivMessageComponent;
  let fixture: ComponentFixture<RenderDivMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderDivMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDivMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
