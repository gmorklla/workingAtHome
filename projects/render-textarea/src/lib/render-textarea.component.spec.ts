import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTextareaComponent } from './render-textarea.component';

describe('RenderTextareaComponent', () => {
  let component: RenderTextareaComponent;
  let fixture: ComponentFixture<RenderTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
