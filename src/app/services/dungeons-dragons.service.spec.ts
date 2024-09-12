import { TestBed } from '@angular/core/testing';

import { DungeonsDragonsService } from './dungeons-dragons.service';

describe('DungeonsDragonsService', () => {
  let service: DungeonsDragonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonsDragonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
