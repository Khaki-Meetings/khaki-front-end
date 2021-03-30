import {createAction, props} from '@ngrx/store';
import {OrganizersAggregateStatisticsSm} from '../models/organizers-aggregate-statistics-sm';
import {ErrorSm} from '../models/error-sm';
import {SetCurrentTimeIntervalActionProp} from './current-time-interval.actions';

export const loadOrganizersAggregateStatisticsAction = createAction(
  '[OrganizersAggregateStatistics] Load OrganizersAggregateStatistics',
);

export const loadOrganizersAggregateStatisticsSuccessAction = createAction(
  '[OrganizersAggregateStatistics] Load OrganizersAggregateStatistics Success',
  props<OrganizersAggregateStatisticsSm>()
);

export const loadOrganizersAggregateStatisticsFailureAction = createAction(
  '[OrganizersAggregateStatistics] Load OrganizersAggregateStatistics Failure',
  props<ErrorSm>()
);
