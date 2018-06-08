import { TestBed, inject } from '@angular/core/testing';

import { DatesArrayService } from './dates-array.service';

describe('DatesArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatesArrayService]
    });
  });

  it('should be created', inject([DatesArrayService], (service: DatesArrayService) => {
    expect(service).toBeTruthy();
  }));
});
