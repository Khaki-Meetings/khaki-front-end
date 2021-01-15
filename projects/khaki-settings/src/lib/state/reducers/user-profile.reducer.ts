import {createReducer, on} from '@ngrx/store';
import {loadUserProfile, loadUserProfileSuccess} from '../actions/user-profile.actions';
import {UserProfileResponseDto} from '../../services/models/userProfileResponseDto';

export const userProfileAttributeKey = 'userProfile';

export const initialState: UserProfileResponseDto = {
  firstName: 'firstname',
  lastName: 'lastname',
  notify: false,
  email: 'email@abc.com'
};


export const userProfileReducer = createReducer(
  initialState,
  on(loadUserProfile, (state: UserProfileResponseDto, action) => state),
  on(
    loadUserProfileSuccess,
    (state: UserProfileResponseDto, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);

