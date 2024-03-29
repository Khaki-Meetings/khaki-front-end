import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeBlockSummaryEffects } from './time-block-summary.effects';

describe('TimeBlockSummariesEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: TimeBlockSummaryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeBlockSummaryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimeBlockSummaryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
