import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMoreInfoFormComponent } from './personnel-more-info-form.component';

describe('PersonnelMoreInfoFormComponent', () => {
  let component: PersonnelMoreInfoFormComponent;
  let fixture: ComponentFixture<PersonnelMoreInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonnelMoreInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelMoreInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
