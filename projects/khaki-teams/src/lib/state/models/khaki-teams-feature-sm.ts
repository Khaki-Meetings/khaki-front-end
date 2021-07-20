import {spinnerAttributeKey} from '../reducers/spinner.reducer';
import {SpinnerSm} from './spinner-sm';
import { teamsFiltersAttributeKey } from '../team-filters/teams-filters.reducer';
import { TeamsFiltersSm } from '../team-filters/teams-filters-sm';

export interface KhakiTeamsFeatureSm {
  [spinnerAttributeKey]: SpinnerSm;
  [teamsFiltersAttributeKey]: TeamsFiltersSm;
}
