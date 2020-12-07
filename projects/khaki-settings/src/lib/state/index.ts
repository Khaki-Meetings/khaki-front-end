import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {userProfileFeatureKey, userProfileReducer} from './reducers/user-profile.reducer';
import {ProfileFeature} from './models/profile-feature';

export const khakiProfileFeatureKey = 'khakiProfile';

export const reducers: ActionReducerMap<ProfileFeature> = {
  [userProfileFeatureKey]: userProfileReducer,
};

export const metaReducers: MetaReducer<ProfileFeature>[] = [];
