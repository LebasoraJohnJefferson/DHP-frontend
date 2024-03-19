import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprenatalComponent } from './editprenatal.component';

describe('EditprenatalComponent', () => {
  let component: EditprenatalComponent;
  let fixture: ComponentFixture<EditprenatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprenatalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprenatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
