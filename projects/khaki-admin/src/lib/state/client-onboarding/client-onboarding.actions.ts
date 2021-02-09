import {createAction, props} from '@ngrx/store';
import {SaveClientOnboardingActionProps} from './save-client-onboarding-action-props';

export const saveClientOnboarding = createAction(
  '[Khaki Admin] Load ClientOnboarding',
  props<SaveClientOnboardingActionProps>()
);

export const saveClientOnboardingSuccess = createAction(
  '[Khaki Admin] Save ClientOnboarding Success'
);

export const saveClientOnboardingFailure = createAction(
  '[Khaki Admin] Load ClientOnboarding Failure',
  props<{ errorMessage: string, errorCode: number }>()
);
