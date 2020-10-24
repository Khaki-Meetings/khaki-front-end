import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrganizersStatisticsEffects } from './organizers-statistics.effects';

describe('OrganizersStatisticsEffects', () => {
  let actions$: Observable<any>;
  let effects: OrganizersStatisticsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizersStatisticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OrganizersStatisticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
