import { TestBed, inject } from '@angular/core/testing';

import { GroupchatapiserviceService } from './groupchatapiservice.service';

describe('GroupchatapiserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupchatapiserviceService]
    });
  });

  it('should be created', inject([GroupchatapiserviceService], (service: GroupchatapiserviceService) => {
    expect(service).toBeTruthy();
  }));
});
