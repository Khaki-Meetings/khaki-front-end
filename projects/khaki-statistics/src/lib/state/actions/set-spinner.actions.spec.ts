import * as fromSetSpinner from './set-spinner.actions';

describe('loadSetSpinners', () => {
  it('should return an action', () => {
    expect(fromSetSpinner.loadSetSpinners().type).toBe('[SetSpinner] Load SetSpinners');
  });
});
