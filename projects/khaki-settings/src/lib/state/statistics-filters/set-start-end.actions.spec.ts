import * as fromSetStartEnd from './set-start-end.actions';

describe('setStartEndAction', () => {
  it('should return an action', () => {
    expect(fromSetStartEnd.setStartEndAction({}).type).toBe('[Khaki Settings] Set Start End');
  });
});
