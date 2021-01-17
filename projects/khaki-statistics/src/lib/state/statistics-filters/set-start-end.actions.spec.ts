import * as fromSetStartEnd from './set-start-end.actions';

describe('loadSetStartEnds', () => {
  it('should return an action', () => {
    expect(fromSetStartEnd.setStartEndAction().type).toBe('[SetStartEnd] Load SetStartEnds');
  });
});
