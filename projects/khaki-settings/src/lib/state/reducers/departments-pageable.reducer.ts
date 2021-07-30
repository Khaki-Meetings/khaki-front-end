import { HistorianService, LogLevel } from '@natr/historian';
import { createReducer, on } from '@ngrx/store';
import { DepartmentsResponsePageableDto } from '../../services/models/departmentsResponseDto';
import { loadDepartmentsPageable, loadDepartmentsPageableSuccess } from '../actions/departments-pageable.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'departmentsPageableReducer');

export const departmentsPageableAttributeKey = 'departmentsPageable';

export const initialState: DepartmentsResponsePageableDto = {
    content: [],
    number: 0,
    loading: false
};

export const departmentsPageableReducer = createReducer(
  initialState,
  on(loadDepartmentsPageable,
    (state: DepartmentsResponsePageableDto, action) => {
      logger.debug('departmentsPageableReducer loadDepartmentsAction');
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadDepartmentsPageableSuccess,
    (state: DepartmentsResponsePageableDto, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.loading = false;
      return newState;
    }
  )
);
