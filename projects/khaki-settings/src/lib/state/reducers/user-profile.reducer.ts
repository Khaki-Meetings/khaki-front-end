import {createReducer, on} from '@ngrx/store';
import {loadUserProfile, loadUserProfileSuccess} from '../actions/user-profile.actions';
import {UserProfileSm} from '../models/user-profile-sm';

export const userProfileFeatureKey = 'userProfile';

export const initialState: UserProfileSm = {
  firstname: 'firstname',
  lastname: 'lastname',
  notifications: 'on',
  email: 'email@abc.com'
};


export const userProfileReducer = createReducer(
  initialState,
  on(loadUserProfile, (state: UserProfileSm, action) => state),
  on(
    loadUserProfileSuccess,
    (state: UserProfileSm, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  ),
);

