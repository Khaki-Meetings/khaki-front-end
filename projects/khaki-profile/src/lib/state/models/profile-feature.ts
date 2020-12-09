import { userProfileFeatureKey } from '../reducers/user-profile.reducer';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';

export interface ProfileFeature {
  [userProfileFeatureKey]: UserProfileResponseDto;
}
