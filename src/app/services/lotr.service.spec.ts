import { TestBed } from '@angular/core/testing';

import { LotrService } from './lotr.service';

describe('LotrService', () => {
  let service: LotrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
