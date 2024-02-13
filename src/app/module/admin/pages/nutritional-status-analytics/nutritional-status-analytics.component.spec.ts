import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStatusAnalyticsComponent } from './nutritional-status-analytics.component';

describe('NutritionalStatusAnalyticsComponent', () => {
  let component: NutritionalStatusAnalyticsComponent;
  let fixture: ComponentFixture<NutritionalStatusAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionalStatusAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionalStatusAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
