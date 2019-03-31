import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderImageComponent } from './render-image.component';

describe('RenderImageComponent', () => {
  let component: RenderImageComponent;
  let fixture: ComponentFixture<RenderImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
