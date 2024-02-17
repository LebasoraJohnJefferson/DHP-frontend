import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskPreschoolAnalyticsComponent } from './at-risk-preschool-analytics.component';

describe('AtRiskPreschoolAnalyticsComponent', () => {
  let component: AtRiskPreschoolAnalyticsComponent;
  let fixture: ComponentFixture<AtRiskPreschoolAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtRiskPreschoolAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtRiskPreschoolAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
