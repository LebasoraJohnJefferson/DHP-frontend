import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrangayComponent } from './brangay.component';

describe('BrangayComponent', () => {
  let component: BrangayComponent;
  let fixture: ComponentFixture<BrangayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrangayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
