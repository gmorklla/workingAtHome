import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleExpressionTableComponent } from './rule-expression-table.component';

describe('RuleExpressionTableComponent', () => {
  let component: RuleExpressionTableComponent;
  let fixture: ComponentFixture<RuleExpressionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleExpressionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleExpressionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
