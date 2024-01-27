import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFamilyDetailsComponent } from './profile-family-details.component';

describe('ProfileFamilyDetailsComponent', () => {
  let component: ProfileFamilyDetailsComponent;
  let fixture: ComponentFixture<ProfileFamilyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileFamilyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileFamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
