import { TestBed, inject } from '@angular/core/testing';

import { AlbumsRepositoryService } from './albums-repository.service';

describe('AlbumsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumsRepositoryService]
    });
  });

  it('should be created', inject([AlbumsRepositoryService], (service: AlbumsRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
