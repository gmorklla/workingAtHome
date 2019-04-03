import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleExpressionDialogComponent } from './rule-expression-dialog.component';

describe('RuleExpressionDialogComponent', () => {
  let component: RuleExpressionDialogComponent;
  let fixture: ComponentFixture<RuleExpressionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleExpressionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleExpressionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
