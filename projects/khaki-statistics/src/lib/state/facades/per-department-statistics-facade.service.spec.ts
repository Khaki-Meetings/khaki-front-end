import {TestBed} from '@angular/core/testing';

import {PerDepartmentStatisticsFacadeService} from './per-department-statistics-facade.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {StatisticsFeature} from '../models/statistics-feature';
import {cold} from 'jasmine-marbles';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {loadPerDepartmentStatistics, loadPerDepartmentStatisticsSuccess} from '../actions/per-department-statistics.actions';

describe('PerDepartmentStatisticsFacadeService', () => {
  let service: PerDepartmentStatisticsFacadeService;
  let mockStore: MockStore<StatisticsFeature>;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [provideMockStore<StatisticsFeature>()]
      }
    );
    service = TestBed.inject(PerDepartmentStatisticsFacadeService);
    mockStore = TestBed.inject<MockStore<StatisticsFeature>>(MockStore);
    spyOn(mockStore, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should dispatch loadPerDepartmentStatistics',
    () => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(loadPerDepartmentStatistics);
    }
  );

  it(
    'should select per department stats',
    () => {
      const newState: StatisticsFeature = {
        statisticsFilters: undefined,
        organizersStatistics: undefined,
        perDepartmentStatistics: {
          departmentsStatistics: [
            {
              totalCost: 1,
              totalSeconds: 1,
              averageCost: 1,
              department: 'finance'
            },
          ],
          errors: []
        },
        spinner: {isSpinning: false},
        timeBlockSummaries: undefined,
        trailingStatistics: undefined
      };
      mockStore.setState(newState);
      const expected = cold('(a|)', {a: {} as DepartmentsStatisticsSm});
      expect(service.perDepartmentStatistics()).toBeObservable(expected);
    }
  );
});
