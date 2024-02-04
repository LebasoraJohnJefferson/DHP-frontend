import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantRecordsFormComponent } from './infant-records-form.component';

describe('InfantRecordsFormComponent', () => {
  let component: InfantRecordsFormComponent;
  let fixture: ComponentFixture<InfantRecordsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfantRecordsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfantRecordsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
