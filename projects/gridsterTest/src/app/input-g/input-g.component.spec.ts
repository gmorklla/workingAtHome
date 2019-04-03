import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGComponent } from './input-g.component';

describe('InputGComponent', () => {
  let component: InputGComponent;
  let fixture: ComponentFixture<InputGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
