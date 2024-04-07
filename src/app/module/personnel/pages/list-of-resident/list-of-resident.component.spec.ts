import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResidentComponent } from './list-of-resident.component';

describe('ListOfResidentComponent', () => {
  let component: ListOfResidentComponent;
  let fixture: ComponentFixture<ListOfResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfResidentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
