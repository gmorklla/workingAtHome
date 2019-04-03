import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDataSourceFieldsControlComponent } from './rule-data-source-fields-control.component';

describe('RuleDataSourceFieldsControlComponent', () => {
  let component: RuleDataSourceFieldsControlComponent;
  let fixture: ComponentFixture<RuleDataSourceFieldsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleDataSourceFieldsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDataSourceFieldsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
