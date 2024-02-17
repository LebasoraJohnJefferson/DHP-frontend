import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationAgeBracketComponent } from './population-age-bracket.component';

describe('PopulationAgeBracketComponent', () => {
  let component: PopulationAgeBracketComponent;
  let fixture: ComponentFixture<PopulationAgeBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopulationAgeBracketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopulationAgeBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
