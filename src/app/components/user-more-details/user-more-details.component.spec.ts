import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMoreDetailsComponent } from './user-more-details.component';

describe('UserMoreDetailsComponent', () => {
  let component: UserMoreDetailsComponent;
  let fixture: ComponentFixture<UserMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMoreDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
