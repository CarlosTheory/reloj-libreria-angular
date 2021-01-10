import { TestBed } from '@angular/core/testing';

import { RelojLibService } from './reloj-lib.service';

describe('RelojLibService', () => {
  let service: RelojLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelojLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
