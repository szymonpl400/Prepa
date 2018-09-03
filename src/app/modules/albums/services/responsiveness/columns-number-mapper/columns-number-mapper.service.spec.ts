import { TestBed, inject } from '@angular/core/testing';

import { ColumnsNumberMapperService } from './columns-number-mapper.service';

describe('ColumnsNumberMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColumnsNumberMapperService]
    });
  });

  it('should be created', inject([ColumnsNumberMapperService], (service: ColumnsNumberMapperService) => {
    expect(service).toBeTruthy();
  }));
});
