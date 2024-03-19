import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditimmunizationComponent } from './editimmunization.component';

describe('EditimmunizationComponent', () => {
  let component: EditimmunizationComponent;
  let fixture: ComponentFixture<EditimmunizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditimmunizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditimmunizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
