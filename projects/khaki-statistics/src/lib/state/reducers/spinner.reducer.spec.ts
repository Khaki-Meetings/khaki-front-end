import {initialState, spinnerReducer} from './spinner.reducer';
import {SpinnerSm} from '../models/spinner-sm';
import {setSpinner} from '../actions/set-spinner.actions';

describe('Spinner Reducer', () => {
  describe(`${setSpinner.type}`, () => {
    it('should be true', () => {
      const newState = {isSpinning: true} as SpinnerSm;
      const action = setSpinner(newState);

      const result = spinnerReducer(initialState, action);

      expect(result).toEqual(newState);
    });

    it('should be false', () => {
      const newState = {isSpinning: false} as SpinnerSm;
      const action = setSpinner(newState);

      const result = spinnerReducer(initialState, action);

      expect(result).toEqual(newState);
    });
  });
});
