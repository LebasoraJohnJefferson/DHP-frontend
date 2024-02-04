import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDocumentComponent } from './owner-document.component';

describe('OwnerDocumentComponent', () => {
  let component: OwnerDocumentComponent;
  let fixture: ComponentFixture<OwnerDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
