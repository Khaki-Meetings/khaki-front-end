import * as fromTimeBlockSummaries from './time-block-summaries.actions';

describe('loadTimeBlockSummariess', () => {
  it('should return an action', () => {
    expect(fromTimeBlockSummaries.loadTimeBlockSummariess().type).toBe('[TimeBlockSummaries] Load TimeBlockSummariess');
  });
});
