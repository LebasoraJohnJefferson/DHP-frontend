import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaranggayComponent } from './baranggay.component';

describe('BaranggayComponent', () => {
  let component: BaranggayComponent;
  let fixture: ComponentFixture<BaranggayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaranggayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaranggayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
