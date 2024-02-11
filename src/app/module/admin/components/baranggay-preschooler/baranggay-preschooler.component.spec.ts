import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaranggayPreschoolerComponent } from './baranggay-preschooler.component';

describe('BaranggayPreschoolerComponent', () => {
  let component: BaranggayPreschoolerComponent;
  let fixture: ComponentFixture<BaranggayPreschoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaranggayPreschoolerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaranggayPreschoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
