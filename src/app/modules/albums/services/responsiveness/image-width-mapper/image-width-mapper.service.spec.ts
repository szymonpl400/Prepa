import { TestBed, inject } from '@angular/core/testing';

import { ImageWidthMapperService } from './image-width-mapper.service';

describe('ImageWidthMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageWidthMapperService]
    });
  });

  it('should be created', inject([ImageWidthMapperService], (service: ImageWidthMapperService) => {
    expect(service).toBeTruthy();
  }));
});
