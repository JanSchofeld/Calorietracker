import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { myGuard } from './my.guard';

describe('myGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => myGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
