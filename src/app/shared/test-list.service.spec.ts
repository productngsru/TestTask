import { TestBed } from '@angular/core/testing';

import { TestListService } from './test-list.service';

describe('TestListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestListService = TestBed.get(TestListService);
    expect(service).toBeTruthy();
  });
});
