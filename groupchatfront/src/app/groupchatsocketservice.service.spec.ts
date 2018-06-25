import { TestBed, inject } from '@angular/core/testing';

import { GroupchatsocketserviceService } from './groupchatsocketservice.service';

describe('GroupchatsocketserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupchatsocketserviceService]
    });
  });

  it('should be created', inject([GroupchatsocketserviceService], (service: GroupchatsocketserviceService) => {
    expect(service).toBeTruthy();
  }));
});
