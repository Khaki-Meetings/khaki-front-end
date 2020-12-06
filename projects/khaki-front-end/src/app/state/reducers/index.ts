import {
  ActionReducer,
  ActionReducerMap, createAction,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on, props
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface KhakiState {
  tenantKey: string;
}

export const setTenantKeyAction = createAction(
  '[Tenant Key] Set Tenant Key',
  props<{tenantKey: string}>()
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

export const reducers: ActionReducerMap<KhakiState> = {
  tenantKey: tenantKeyReducer
};


export const metaReducers: MetaReducer<KhakiState>[] = !environment.production ? [] : [];
