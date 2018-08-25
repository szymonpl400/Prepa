import { TestBed, inject } from '@angular/core/testing';

import { TypeHelperService } from './type-helper.service';

describe('TypeHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeHelperService]
    });
  });

  it('should be created', inject([TypeHelperService], (service: TypeHelperService) => {
    expect(service).toBeTruthy();
  }));
});
