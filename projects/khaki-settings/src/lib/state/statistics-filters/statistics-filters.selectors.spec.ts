import {statisticsFiltersSelector} from './statistics-filters.selectors';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {khakiSettingsFeatureKey} from '../index';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';


describe('StatisticsFilters Selectors', () => {
  it('should select the feature state', () => {
    const statsState: StatisticsFiltersSm = {statisticsScope: undefined, end: undefined, interval: undefined, start: undefined,
      organizer: undefined};
    const settingsState: KhakiSettingsFeatureSm = {
      departments: undefined,
      employees: undefined,
      statisticsFilters: statsState,
      userProfile: undefined
    };
    const state = {
      [khakiSettingsFeatureKey]: settingsState,
    };
    const thing = statisticsFiltersSelector(state);

    expect(Object.keys(thing)).toEqual(Object.keys(statsState));
  });
});
