import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprenatalComponent } from './newprenatal.component';

describe('NewprenatalComponent', () => {
  let component: NewprenatalComponent;
  let fixture: ComponentFixture<NewprenatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewprenatalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewprenatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
