import { TestBed, inject } from '@angular/core/testing';

import { RowHeightMapperService } from './row-height-mapper.service';

describe('RowHeightMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RowHeightMapperService]
    });
  });

  it('should be created', inject([RowHeightMapperService], (service: RowHeightMapperService) => {
    expect(service).toBeTruthy();
  }));
});
