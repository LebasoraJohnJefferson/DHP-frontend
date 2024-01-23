import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAccountComponent } from './personnel-account.component';

describe('PersonnelAccountComponent', () => {
  let component: PersonnelAccountComponent;
  let fixture: ComponentFixture<PersonnelAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonnelAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
