import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleExpressionComponent } from './rule-expression.component';

describe('RuleExpressionComponent', () => {
  let component: RuleExpressionComponent;
  let fixture: ComponentFixture<RuleExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleExpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
