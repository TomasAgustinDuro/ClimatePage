import { TestBed } from '@angular/core/testing';

import { AutocompletarServiceService } from './autocompletar-service.service';

describe('AutocompletarServiceService', () => {
  let service: AutocompletarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompletarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
