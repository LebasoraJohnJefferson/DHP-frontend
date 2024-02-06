import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileFormComponent } from './family-profile-form.component';

describe('FamilyProfileFormComponent', () => {
  let component: FamilyProfileFormComponent;
  let fixture: ComponentFixture<FamilyProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyProfileFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
