import {ActionReducerMap, createAction, createReducer, MetaReducer, on, props} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {statisticsFiltersAttributeKey, statisticsFiltersReducer} from '../statistics-filters/statistics-filters.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';

export interface KhakiState {
  tenantKey: string;
  tenantMap: Map<string, string>;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
}

export const setTenantKeyAction = createAction(
  '[Tenant Key] Set Tenant Key',
  props<{ tenantKey: string }>()
);

export const setTenantMapAction = createAction(
  '[Tenant Key] Set Tenant Map',
  props<{ tenantMap: Map<string, string> }>()
);

const tenantKeyReducer = createReducer(
  '',
  on(
    setTenantKeyAction,
    (state, action) => {
      return action.tenantKey;
    }
  )
);

const tenantMapReducer = createReducer(
  new Map<string, string>(),
  on(
    setTenantMapAction,
    (state, action) => {
      console.log('tenantMapReducer action is', action);
      return action.tenantMap;
    }
  )
);

export const reducers: ActionReducerMap<KhakiState> = {
  tenantKey: tenantKeyReducer,
  tenantMap: tenantMapReducer,
  [statisticsFiltersAttributeKey]: statisticsFiltersReducer
};

export const metaReducers: MetaReducer<KhakiState>[] = !environment.production ? [] : [];
