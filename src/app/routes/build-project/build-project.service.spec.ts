import { TestBed, inject } from '@angular/core/testing';

import { BuildProjectService } from './build-project.service';

describe('BuildProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildProjectService]
    });
  });

  it('should be created', inject([BuildProjectService], (service: BuildProjectService) => {
    expect(service).toBeTruthy();
  }));
});
