import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {MeetingsListEffects} from './meetings-list.effects';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {loadMeetingsListAction} from '../actions/meetings-list.actions';
import {StatisticsService} from '../../services/statistics.service';
import {MeetingsListFacadeService} from '../facades/meetings-list-facade.service';
import {MeetingsListSm} from '../models/meetings-list-sm';

describe('MeetingsListEffects', () => {
  let actions$: Observable<Action>;
  let effects: MeetingsListEffects;
  let statisticsService: Partial<StatisticsService>;
  let meetingsListFacade: Partial<MeetingsListFacadeService>;
  const meetingsListData: MeetingsListSm = {content: [], number: 0};

  beforeEach(() => {
    statisticsService = {};
    meetingsListFacade = {
      setMeetingsList(data: MeetingsListSm): void {
      }
    };

    spyOn(meetingsListFacade, 'setMeetingsList');
    spyOn(statisticsService, 'getMeetingsList')
      .and
      .returnValue(
        cold('---a|', {a: meetingsListData})
      );

    actions$ = hot('--a', {a: loadMeetingsListAction()});
    TestBed.configureTestingModule({
      providers: [
        MeetingsListEffects,
        provideMockActions(() => actions$),
        {provide: MeetingsListFacadeService, useValue: meetingsListFacade},
        {provide: StatisticsService, useValue: statisticsService}
      ]
    });

    effects = TestBed.inject(MeetingsListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(
    'should um, do stuffz',
    () => {
      const expected = hot('---a', {a: loadMeetingsListAction()});

      expect(effects.meetingsListEffect$).toBeObservable(expected);

      expect(meetingsListFacade.setMeetingsList).toHaveBeenCalledTimes(1);
      expect(statisticsService.getMeetingsList).toHaveBeenCalledTimes(1);
    }
  );
});
