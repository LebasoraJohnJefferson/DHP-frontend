import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPreschoolerWithNutritionalStatusComponent } from './list-of-preschooler-with-nutritional-status.component';

describe('ListOfPreschoolerWithNutritionalStatusComponent', () => {
  let component: ListOfPreschoolerWithNutritionalStatusComponent;
  let fixture: ComponentFixture<ListOfPreschoolerWithNutritionalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfPreschoolerWithNutritionalStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfPreschoolerWithNutritionalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
