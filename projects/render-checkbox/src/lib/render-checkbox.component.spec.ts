import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCheckboxComponent } from './render-checkbox.component';

describe('RenderCheckboxComponent', () => {
  let component: RenderCheckboxComponent;
  let fixture: ComponentFixture<RenderCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
