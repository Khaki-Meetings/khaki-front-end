import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeBlockSummaryGoalEffects } from './time-block-summary-goal.effects';

describe('TimeBlockSummaryGoalsEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: TimeBlockSummaryGoalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeBlockSummaryGoalEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimeBlockSummaryGoalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
