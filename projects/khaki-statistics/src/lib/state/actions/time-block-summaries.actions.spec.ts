import * as fromTimeBlockSummaries from './time-block-summaries.actions';

describe('loadTimeBlockSummariess', () => {
  it('should return an action', () => {
    expect(fromTimeBlockSummaries.loadTimeBlockSummary().type).toBe('[TimeBlockSummaries] Load TimeBlockSummariess');
  });
});
