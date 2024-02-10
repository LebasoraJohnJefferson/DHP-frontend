import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolRecordsFormComponent } from './preschool-records-form.component';

describe('PreschoolRecordsFormComponent', () => {
  let component: PreschoolRecordsFormComponent;
  let fixture: ComponentFixture<PreschoolRecordsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreschoolRecordsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreschoolRecordsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
