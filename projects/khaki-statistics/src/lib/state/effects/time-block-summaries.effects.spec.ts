import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeBlockSummariesEffects } from './time-block-summaries.effects';

describe('TimeBlockSummariesEffects', () => {
  let actions$: Observable<any>;
  let effects: TimeBlockSummariesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeBlockSummariesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimeBlockSummariesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
