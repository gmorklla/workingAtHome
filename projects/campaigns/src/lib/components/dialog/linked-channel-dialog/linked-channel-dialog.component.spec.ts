import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedChannelDialogComponent } from './linked-channel-dialog.component';

describe('LinkedChannelDialogComponent', () => {
  let component: LinkedChannelDialogComponent;
  let fixture: ComponentFixture<LinkedChannelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedChannelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
