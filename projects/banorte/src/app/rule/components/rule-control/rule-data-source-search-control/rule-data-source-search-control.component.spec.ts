import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDataSourceSearchControlComponent } from './rule-data-source-search-control.component';

describe('RuleDataSourceSearchControlComponent', () => {
  let component: RuleDataSourceSearchControlComponent;
  let fixture: ComponentFixture<RuleDataSourceSearchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleDataSourceSearchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDataSourceSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
