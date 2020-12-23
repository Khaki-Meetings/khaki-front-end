import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {OrganizersStatisticsEffects} from './organizers-statistics.effects';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {StatisticsService} from '../../services/statistics.service';
import {OrganizersStatisticsDto} from '../../services/models/organizers-statistics-dto';
import {OrganizersStatisticsFacadeService} from '../facades/organizers-statistics-facade.service';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

describe('OrganizersStatisticsEffects', () => {
  let actions$: Observable<Action>;
  let effects: OrganizersStatisticsEffects;
  let statisticsService: Partial<StatisticsService>;
  let organizerStatisticsFacade: Partial<OrganizersStatisticsFacadeService>;
  const organizersStatisticsData: OrganizersStatisticsDto = {content: [], number: 0};

  beforeEach(() => {
    statisticsService = {
    };
    organizerStatisticsFacade = {
      setOrganizersStatistics(data: OrganizersStatisticsSm): void {
      }
    };

    spyOn(organizerStatisticsFacade, 'setOrganizersStatistics');
    spyOn(statisticsService, 'getOrganizersStatistics')
      .and
      .returnValue(
        cold('---a|', {a: organizersStatisticsData})
      );

    actions$ = hot('--a', {a: loadOrganizersStatistics({interval: IntervalEnum.Week})});
    TestBed.configureTestingModule({
      providers: [
        OrganizersStatisticsEffects,
        provideMockActions(() => actions$),
        {provide: OrganizersStatisticsFacadeService, useValue: organizerStatisticsFacade},
        {provide: StatisticsService, useValue: statisticsService}
      ]
    });

    effects = TestBed.inject(OrganizersStatisticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(
    'should um, do stuffz',
    () => {
      const expected = hot('---a', {a: loadOrganizersStatistics({interval: IntervalEnum.Week})});

      expect(effects.organizersStatisticsEffect$).toBeObservable(expected);

      expect(organizerStatisticsFacade.setOrganizersStatistics).toHaveBeenCalledTimes(1);
      expect(statisticsService.getOrganizersStatistics).toHaveBeenCalledTimes(1);
    }
  );
});
