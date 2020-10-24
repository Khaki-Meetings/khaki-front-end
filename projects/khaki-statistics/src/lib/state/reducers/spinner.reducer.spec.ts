import {initialState, spinnerReducer} from './spinner.reducer';

describe('Spinner Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = spinnerReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
