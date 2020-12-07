import * as fromUserProfile from './user-profile.actions';

describe('loadUserProfile', () => {
  it('should return an action', () => {
    expect(fromUserProfile.loadUserProfile({}).type)
      .toBe('[UserProfile] Load UserProfile');
  });
});
