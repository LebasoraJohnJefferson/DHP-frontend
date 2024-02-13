import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolWithNutritionalStatusFormComponent } from './preschool-with-nutritional-status-form.component';

describe('PreschoolWithNutritionalStatusFormComponent', () => {
  let component: PreschoolWithNutritionalStatusFormComponent;
  let fixture: ComponentFixture<PreschoolWithNutritionalStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreschoolWithNutritionalStatusFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreschoolWithNutritionalStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
