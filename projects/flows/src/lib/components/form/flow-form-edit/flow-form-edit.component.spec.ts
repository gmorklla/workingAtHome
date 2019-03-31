import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowFormEditComponent } from './flow-form-edit.component';

describe('FlowFormEditComponent', () => {
  let component: FlowFormEditComponent;
  let fixture: ComponentFixture<FlowFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
