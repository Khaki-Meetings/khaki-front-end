import {ActionReducerMap, createAction, createReducer, MetaReducer, on, props} from '@ngrx/store';

export interface KhakiState {
  tenantKey: string;
  tenantMap: Map<string, string>;
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
  tenantMap: tenantMapReducer
};
