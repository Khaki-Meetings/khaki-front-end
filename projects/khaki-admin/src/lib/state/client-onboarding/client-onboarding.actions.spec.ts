import * as fromClientOnboarding from './client-onboarding.actions';

describe('saveClientOnboarding', () => {
  it('should return an action', () => {
    expect(fromClientOnboarding.saveClientOnboarding.type).toBe('[Khaki Admin] Load ClientOnboarding');
  });
});
