import * as fromTimeBlockSummaries from './time-block-summaries.actions';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('loadTimeBlockSummary', () => {
  it('should return an action', () => {
    expect(fromTimeBlockSummaries.loadTimeBlockSummary({interval: IntervalEnum.Week}).type)
      .toBe('[TimeBlockSummaries] Load TimeBlockSummary');
  });
});
