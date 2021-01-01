import {createAction, props} from '@ngrx/store';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {ErrorSm} from '../models/error-sm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadOrganizersStatistics = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics',
);

export const loadOrganizersStatisticsSuccess = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Success',
  props<OrganizersStatisticsSm>()
);

export const loadOrganizersStatisticsFailure = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Failure',
  props<ErrorSm>()
);
