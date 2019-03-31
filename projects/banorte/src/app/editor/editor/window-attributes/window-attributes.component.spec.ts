import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowAttributesComponent } from './window-attributes.component';

describe('WindowAttributesComponent', () => {
  let component: WindowAttributesComponent;
  let fixture: ComponentFixture<WindowAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
