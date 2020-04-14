import { TestBed } from '@angular/core/testing';

import { CoronavirusApiService } from './coronavirus-api.service';

describe('CoronavirusApiService', () => {
  let service: CoronavirusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
