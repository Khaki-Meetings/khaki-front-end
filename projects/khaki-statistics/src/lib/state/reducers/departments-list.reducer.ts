import {createReducer, on} from '@ngrx/store';
import {HistorianService, LogLevel} from '@natr/historian';
import { DepartmentsListSm } from '../models/departments-list-sm';
import { loadDepartmentsListAction, loadDepartmentsListFailureAction, loadDepartmentsListSuccessAction } from '../actions/departments-list.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'DepartmentsListReducer');

export const departmentsListFeatureKey = 'departmentsList';

export const initialState: DepartmentsListSm = {
  content: [],
  number: 0,
  loading: false
};

export const departmentsListReducer = createReducer(
  initialState,
  on(
    loadDepartmentsListAction,
    (state: DepartmentsListSm, action) => {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadDepartmentsListFailureAction,
    (state, action) => {
      const newState = {...state};
      newState.error = {...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadDepartmentsListSuccessAction,
    (state: DepartmentsListSm, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.content = newState.content.map(
        departmentList => {
          return {
            name: departmentList.name
          };
        }
      );
      newState.loading = false;
      return newState;
    }
  ),
);
