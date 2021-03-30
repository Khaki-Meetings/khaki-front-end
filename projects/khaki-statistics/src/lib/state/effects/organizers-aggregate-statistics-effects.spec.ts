import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {OrganizersStatisticsEffects} from './organizers-statistics.effects';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';
import {StatisticsService} from '../../services/statistics.service';
import {OrganizersStatisticsDto} from '../../services/models/organizers-statistics-dto';
import {OrganizersStatisticsFacadeService} from '../facades/organizers-statistics-facade.service';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import { OrganizersAggregateStatisticsEffects } from './organizers-aggregate-statistics-effects';
import { OrganizersAggregateStatisticsFacadeService } from '../facades/organizers-aggregate-statistics-facade.service';
import { OrganizersAggregateStatisticsSm } from '../models/organizers-aggregate-statistics-sm';
import { loadOrganizersAggregateStatisticsAction } from '../actions/organizers-aggregate-statistics.actions';

describe('OrganizersAggregateStatisticsEffects', () => {
  let actions$: Observable<Action>;
  let effects: OrganizersAggregateStatisticsEffects;
  let statisticsService: Partial<StatisticsService>;
  let organizerStatisticsFacade: Partial<OrganizersAggregateStatisticsFacadeService>;
  const organizersStatisticsData: OrganizersStatisticsDto = {content: [], number: 0};

  beforeEach(() => {
    statisticsService = {};
    organizerStatisticsFacade = {
      setOrganizersAggregateStatistics(data: OrganizersAggregateStatisticsSm): void {
      }
    };

    spyOn(organizerStatisticsFacade, 'setOrganizersAggregateStatistics');
    spyOn(statisticsService, 'getAggregateOrganizersStatistics')
      .and
      .returnValue(
        cold('---a|', {a: organizersStatisticsData})
      );

    actions$ = hot('--a', {a: loadOrganizersAggregateStatisticsAction()});
    TestBed.configureTestingModule({
      providers: [
        OrganizersAggregateStatisticsEffects,
        provideMockActions(() => actions$),
        {provide: OrganizersAggregateStatisticsFacadeService, useValue: organizerStatisticsFacade},
        {provide: StatisticsService, useValue: statisticsService}
      ]
    });

    effects = TestBed.inject(OrganizersAggregateStatisticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(
    'should um, do stuffz',
    () => {
      const expected = hot('---a', {a: loadOrganizersStatisticsAction()});

      expect(effects.organizersAggregateStatisticsEffect$).toBeObservable(expected);

      expect(organizerStatisticsFacade.setOrganizersAggregateStatistics).toHaveBeenCalledTimes(1);
      expect(statisticsService.getAggregateOrganizersStatistics).toHaveBeenCalledTimes(1);
    }
  );
});
