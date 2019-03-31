import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLibComponent } from './select-lib.component';

describe('SelectLibComponent', () => {
  let component: SelectLibComponent;
  let fixture: ComponentFixture<SelectLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
