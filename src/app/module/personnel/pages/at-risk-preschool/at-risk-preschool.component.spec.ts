import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskPreschoolComponent } from './at-risk-preschool.component';

describe('AtRiskPreschoolComponent', () => {
  let component: AtRiskPreschoolComponent;
  let fixture: ComponentFixture<AtRiskPreschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtRiskPreschoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtRiskPreschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
