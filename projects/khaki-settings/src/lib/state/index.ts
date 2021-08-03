import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {userProfileAttributeKey, userProfileReducer} from './reducers/user-profile.reducer';
import {KhakiSettingsFeatureSm} from './khaki-settings-feature-sm';
import {employeesAttributeKey, employeesReducer} from './reducers/employees.reducer';
import {departmentsAttributeKey, departmentsReducer} from './reducers/departments.reducer';
import {statisticsFiltersAttributeKey, statisticsFiltersReducer} from './statistics-filters/statistics-filters.reducer';
import { employeesTablePageableAttributeKey, employeesTablePageableReducer } from './employees-table-pageable/employees-table-pageable.reducer';
import { departmentsTableAttributeKey, departmentsTablePageableAttributeKey, departmentsTablePageableReducer } from './departments-table-pageable/departments-table-pageable.reducer';
import { departmentsPageableReducer } from './reducers/departments-pageable.reducer';

export const khakiSettingsFeatureKey = 'khakiSettings';

export const reducers: ActionReducerMap<KhakiSettingsFeatureSm> = {
  [userProfileAttributeKey]: userProfileReducer,
  [employeesAttributeKey]: employeesReducer,
  [departmentsAttributeKey]: departmentsReducer,
  [statisticsFiltersAttributeKey]: statisticsFiltersReducer,
  [employeesTablePageableAttributeKey]: employeesTablePageableReducer,
  [departmentsTablePageableAttributeKey]: departmentsTablePageableReducer,
  [departmentsTableAttributeKey]: departmentsPageableReducer
};

export const metaReducers: MetaReducer<KhakiSettingsFeatureSm>[] = [];
