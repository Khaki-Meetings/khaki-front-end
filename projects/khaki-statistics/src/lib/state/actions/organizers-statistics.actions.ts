import {createAction, props} from '@ngrx/store';
import {OrganizersStatistics} from '../models/organizers-statistics';
import {ErrorSm} from '../models/errorSm';

export const loadOrganizersStatistics = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics'
);

export const loadOrganizersStatisticsSuccess = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Success',
  props<OrganizersStatistics>()
);

export const loadOrganizersStatisticsFailure = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Failure',
  props<{errors: ErrorSm[]}>()
);
