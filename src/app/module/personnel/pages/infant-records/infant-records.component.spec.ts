import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantRecordsComponent } from './infant-records.component';

describe('InfantRecordsComponent', () => {
  let component: InfantRecordsComponent;
  let fixture: ComponentFixture<InfantRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfantRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfantRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
