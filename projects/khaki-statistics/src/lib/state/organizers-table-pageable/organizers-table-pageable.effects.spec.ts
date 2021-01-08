import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrganizersTablePageableEffects } from './organizers-table-pageable.effects';

describe('OrganizersTablePageableEffects', () => {
  let actions$: Observable<any>;
  let effects: OrganizersTablePageableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizersTablePageableEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OrganizersTablePageableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
