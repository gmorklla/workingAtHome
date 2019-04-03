import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDataSourceFieldControlComponent } from './rule-data-source-field-control.component';

describe('RuleDataSourceFieldControlComponent', () => {
  let component: RuleDataSourceFieldControlComponent;
  let fixture: ComponentFixture<RuleDataSourceFieldControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleDataSourceFieldControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDataSourceFieldControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
