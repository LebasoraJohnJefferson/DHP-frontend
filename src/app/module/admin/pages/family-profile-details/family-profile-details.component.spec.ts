import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileDetailsComponent } from './family-profile-details.component';

describe('FamilyProfileDetailsComponent', () => {
  let component: FamilyProfileDetailsComponent;
  let fixture: ComponentFixture<FamilyProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyProfileDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
