import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {userProfileFeatureKey, userProfileReducer} from './reducers/user-profile.reducer';
import {ProfileFeature} from './models/profile-feature';
import { employeesFeatureKey, employeesReducer } from './reducers/employees.reducer';
import { departmentsFeatureKey, departmentsReducer } from './reducers/departments.reducer';

export const khakiProfileFeatureKey = 'khakiProfile';

export const reducers: ActionReducerMap<ProfileFeature> = {
  [userProfileFeatureKey]: userProfileReducer,
  [employeesFeatureKey]: employeesReducer,
  [departmentsFeatureKey]: departmentsReducer,
};

export const metaReducers: MetaReducer<ProfileFeature>[] = [];
