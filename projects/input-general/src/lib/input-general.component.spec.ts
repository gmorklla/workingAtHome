import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGeneralComponent } from './input-general.component';

describe('InputGeneralComponent', () => {
  let component: InputGeneralComponent;
  let fixture: ComponentFixture<InputGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
