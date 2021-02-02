import {TestBed} from '@angular/core/testing';

import {PerDepartmentStatisticsFacadeService} from './per-department-statistics-facade.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {cold} from 'jasmine-marbles';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';

describe('PerDepartmentStatisticsFacadeService', () => {
  let service: PerDepartmentStatisticsFacadeService;
  let mockStore: MockStore<KhakiStatisticsFeatureSm>;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [provideMockStore<KhakiStatisticsFeatureSm>()]
      }
    );
    service = TestBed.inject(PerDepartmentStatisticsFacadeService);
    mockStore = TestBed.inject<MockStore<KhakiStatisticsFeatureSm>>(MockStore);
    spyOn(mockStore, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should dispatch loadPerDepartmentStatistics',
    () => {
      service.requestPerDepartmentStatistics();
      expect(mockStore.dispatch).toHaveBeenCalledWith(loadPerDepartmentStatistics);
    }
  );

  it(
    'should select per department stats',
    () => {
      const newState: KhakiStatisticsFeatureSm = {
        organizersTablePageable: undefined,
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
          error: {}
        },
        spinner: {isSpinning: false},
        timeBlockSummaries: undefined,
        trailingStatistics: undefined
      };
      mockStore.setState(newState);
      const expected = cold('(a|)', {a: {} as DepartmentsStatisticsSm});
      // expect(service.perDepartmentStatistics()).toBeObservable(expected);
    }
  );
});
