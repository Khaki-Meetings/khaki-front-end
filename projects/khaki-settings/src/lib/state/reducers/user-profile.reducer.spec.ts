import {initialState, userProfileReducer} from './user-profile.reducer';
import {
  loadUserProfile
} from '../actions/user-profile.actions';
import {UserProfileSm} from '../models/user-profile-sm';

describe('UserProfile Reducer', () => {
  describe(`${loadUserProfile.type}`, () => {
    it('should return the previous state', () => {
      const action = loadUserProfile({});

      const result = userProfileReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
