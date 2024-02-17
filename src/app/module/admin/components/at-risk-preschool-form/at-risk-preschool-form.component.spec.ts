import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskPreschoolFormComponent } from './at-risk-preschool-form.component';

describe('AtRiskPreschoolFormComponent', () => {
  let component: AtRiskPreschoolFormComponent;
  let fixture: ComponentFixture<AtRiskPreschoolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtRiskPreschoolFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtRiskPreschoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
