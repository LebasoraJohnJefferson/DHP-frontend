import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantComponent } from './infant.component';

describe('InfantComponent', () => {
  let component: InfantComponent;
  let fixture: ComponentFixture<InfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
