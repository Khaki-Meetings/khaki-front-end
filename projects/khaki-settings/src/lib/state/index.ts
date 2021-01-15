import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {userProfileAttributeKey, userProfileReducer} from './reducers/user-profile.reducer';
import {ProfileFeature} from './models/profile-feature';
import { employeesAttributeKey, employeesReducer } from './reducers/employees.reducer';
import { departmentsAttributeKey, departmentsReducer } from './reducers/departments.reducer';

export const khakiProfileFeatureKey = 'khakiProfile';

export const reducers: ActionReducerMap<ProfileFeature> = {
  [userProfileAttributeKey]: userProfileReducer,
  [employeesAttributeKey]: employeesReducer,
  [departmentsAttributeKey]: departmentsReducer,
};

export const metaReducers: MetaReducer<ProfileFeature>[] = [];
