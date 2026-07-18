import { TestBed } from '@angular/core/testing';

import { Servicio1 } from './servicio-1';

describe('Servicio1', () => {
  let service: Servicio1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicio1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
