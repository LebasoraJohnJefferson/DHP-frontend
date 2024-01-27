import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileAnalyticsComponent } from './family-profile-analytics.component';

describe('FamilyProfileAnalyticsComponent', () => {
  let component: FamilyProfileAnalyticsComponent;
  let fixture: ComponentFixture<FamilyProfileAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyProfileAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyProfileAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
