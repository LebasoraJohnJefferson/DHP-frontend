import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewimmunizationComponent } from './newimmunization.component';

describe('NewimmunizationComponent', () => {
  let component: NewimmunizationComponent;
  let fixture: ComponentFixture<NewimmunizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewimmunizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewimmunizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
