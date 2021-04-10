import * as fromTimeBlockSummaryGoals from './time-block-summary-goals.actions';

describe('loadTimeBlockSummaryGoals', () => {
  it('should return an action', () => {
    expect(fromTimeBlockSummaryGoals.loadTimeBlockSummaryGoals())
      .toBe('[TimeBlockSummaryGoalListSm] Load TimeBlockSummaryGoalListSm');
  });
});
