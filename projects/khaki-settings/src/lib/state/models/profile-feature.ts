import { userProfileFeatureKey } from '../reducers/user-profile.reducer';
import { UserProfileSm } from './user-profile-sm';

export interface ProfileFeature {
  [userProfileFeatureKey]: UserProfileSm;
}
