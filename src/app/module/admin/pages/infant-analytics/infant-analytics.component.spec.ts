import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantAnalyticsComponent } from './infant-analytics.component';

describe('InfantAnalyticsComponent', () => {
  let component: InfantAnalyticsComponent;
  let fixture: ComponentFixture<InfantAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfantAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfantAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
