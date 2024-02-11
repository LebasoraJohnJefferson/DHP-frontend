import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrgyPreschoolerAnalyticsComponent } from './brgy-preschooler-analytics.component';

describe('BrgyPreschoolerAnalyticsComponent', () => {
  let component: BrgyPreschoolerAnalyticsComponent;
  let fixture: ComponentFixture<BrgyPreschoolerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrgyPreschoolerAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrgyPreschoolerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
