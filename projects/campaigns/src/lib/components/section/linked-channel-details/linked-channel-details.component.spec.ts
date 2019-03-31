import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedChannelDetailsComponent } from './linked-channel-details.component';

describe('LinkedChannelDetailsComponent', () => {
  let component: LinkedChannelDetailsComponent;
  let fixture: ComponentFixture<LinkedChannelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedChannelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
