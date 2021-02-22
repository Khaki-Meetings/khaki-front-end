import {clientOnboardingReducer, initialState} from './client-onboarding.reducer';
import {saveClientOnboarding, saveClientOnboardingFailure, saveClientOnboardingSuccess} from './client-onboarding.actions';

describe('ClientOnboarding Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = clientOnboardingReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('saveClientOnboarding', () => {
    it('should turn spinner on and all else null', () => {
      const action = saveClientOnboarding({name: 'bob', adminEmail: 'bob@bob.com'});

      const result = clientOnboardingReducer(initialState, action);

      expect(result.spinner).toBeTrue();
      expect(result.errorCode).toBeNull();
      expect(result.errorMessage).toBeNull();
    });
  });

  describe('saveClientOnboardingSuccess', () => {
    it('should turn off spinner and set all else to null', () => {
      const action = saveClientOnboardingSuccess();

      const result = clientOnboardingReducer(initialState, action);

      expect(result.spinner).toBeFalse();
      expect(result.errorCode).toBeNull();
      expect(result.errorMessage).toBeNull();
    });

    describe('saveClientOnboardingFailure', () => {
      it('should turn off spinner and set message and code appropriately', () => {
        const msg = 'you failed';
        const code = 1234;
        const action = saveClientOnboardingFailure({errorMessage: msg, errorCode: code});

        const result = clientOnboardingReducer(initialState, action);

        expect(result.spinner).toBeFalse();
        expect(result.errorCode).toEqual(code);
        expect(result.errorMessage).toEqual(msg);
      });
    });
  });
});
