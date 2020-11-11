import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CurrentTimeIntervalEffects } from './current-time-interval.effects';

describe('CurrentTimeIntervalEffects', () => {
  let actions$: Observable<any>;
  let effects: CurrentTimeIntervalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentTimeIntervalEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CurrentTimeIntervalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
