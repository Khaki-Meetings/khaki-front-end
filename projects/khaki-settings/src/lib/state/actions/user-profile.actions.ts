import {createAction, props} from '@ngrx/store';
import {UserProfileSm} from '../models/user-profile-sm';

export const loadUserProfile = createAction(
  '[UserProfile] Load UserProfile',
  props<UserProfileSm>()
);

export const loadUserProfileSuccess = createAction(
  '[UserProfile] Load UserProfileSuccess',
  props<UserProfileSm>()
);