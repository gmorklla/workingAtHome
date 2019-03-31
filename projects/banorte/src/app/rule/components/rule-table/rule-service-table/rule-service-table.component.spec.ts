import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleServiceTableComponent } from './rule-service-table.component';

describe('RuleServiceTableComponent', () => {
  let component: RuleServiceTableComponent;
  let fixture: ComponentFixture<RuleServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleServiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
