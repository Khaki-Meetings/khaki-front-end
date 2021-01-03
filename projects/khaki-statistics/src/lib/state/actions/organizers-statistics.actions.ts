import {createAction, props} from '@ngrx/store';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {ErrorSm} from '../models/error-sm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadOrganizersStatisticsAction = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics',
);

export const loadOrganizersStatisticsSuccessAction = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Success',
  props<OrganizersStatisticsSm>()
);

export const loadOrganizersStatisticsFailureAction = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Failure',
  props<ErrorSm>()
);
