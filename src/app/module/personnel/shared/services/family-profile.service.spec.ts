import { TestBed } from '@angular/core/testing';

import { FamilyProfileService } from './family-profile.service';

describe('FamilyProfileService', () => {
  let service: FamilyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
