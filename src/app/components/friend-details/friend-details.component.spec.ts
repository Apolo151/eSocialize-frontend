import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDetailsComponent } from './friend-details.component';

describe('FriendDetailsComponent', () => {
  let component: FriendDetailsComponent;
  let fixture: ComponentFixture<FriendDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendDetailsComponent]
    });
    fixture = TestBed.createComponent(FriendDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
