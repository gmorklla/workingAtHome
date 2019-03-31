import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingMsgComponent } from './typing-msg.component';

describe('TypingMsgComponent', () => {
  let component: TypingMsgComponent;
  let fixture: ComponentFixture<TypingMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
