import {createAction, props} from '@ngrx/store';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';

export const loadUserProfile = createAction(
  '[UserProfile] Load UserProfile',
  props<UserProfileResponseDto>()
);

export const loadUserProfileSuccess = createAction(
  '[UserProfile] Load UserProfileSuccess',
  props<UserProfileResponseDto>()
);