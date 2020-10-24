import {createAction, props} from '@ngrx/store';
import {OrganizersStatistics} from '../models/organizers-statistics';
import {Error} from '../models/error';

export const loadOrganizersStatistics = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics'
);

export const loadOrganizersStatisticsSuccess = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Success',
  props<OrganizersStatistics>()
);

export const loadOrganizersStatisticsFailure = createAction(
  '[OrganizersStatistics] Load OrganizersStatistics Failure',
  props<{errors: Error[]}>()
);
