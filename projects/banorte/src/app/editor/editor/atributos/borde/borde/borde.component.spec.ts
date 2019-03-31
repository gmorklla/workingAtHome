import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BordeComponent } from './borde.component';

describe('BordeComponent', () => {
  let component: BordeComponent;
  let fixture: ComponentFixture<BordeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BordeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BordeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
