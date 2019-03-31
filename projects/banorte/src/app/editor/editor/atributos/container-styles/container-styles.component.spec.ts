import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerStylesComponent } from './container-styles.component';

describe('ContainerStylesComponent', () => {
  let component: ContainerStylesComponent;
  let fixture: ComponentFixture<ContainerStylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerStylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
