import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleVariableDesignSearchControlComponent } from './rule-variable-design-search-control.component';

describe('RuleVariableDesignSearchControlComponent', () => {
  let component: RuleVariableDesignSearchControlComponent;
  let fixture: ComponentFixture<RuleVariableDesignSearchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleVariableDesignSearchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleVariableDesignSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
