import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {setAttendeeAction} from './set-attendee.actions';
import { TeamsFiltersSm } from './teams-filters-sm';
import { setTeamsFiltersAction } from './set-teams-filters.actions';
import { teamsAttendeeSelector, teamsFiltersSelector } from './teams-filters.selectors';
import { KhakiTeamsFeatureSm } from '../models/khaki-teams-feature-sm';

@Logging
@Injectable({providedIn: 'root'})
export class TeamsFiltersFacade {
  // noinspection JSUnusedLocalSymbols
  private logger: HistorianService;

  constructor(private store: Store<KhakiTeamsFeatureSm>) {
  }

  public dispatchSetTeamsFilters(teamsFilters: TeamsFiltersSm): void {
    this.logger.debug('teams dispatchSetTeamsFilters', teamsFilters);
    this.store.dispatch(setTeamsFiltersAction({teamsFilters}));
  }

  public dispatchSetAttendee(attendee: string): void {
    this.logger.debug('dispatchSetAttendee', attendee);
    this.store.dispatch(setAttendeeAction({attendee}));
  }

  public selectTeamsFilters(): Observable<TeamsFiltersSm> {
    this.logger.debug('TeamsFiltersFacade selectTeamsFilters');
    return this.store.select(teamsFiltersSelector)
      .pipe(
        map(teamsFilters => (
            {
              ...teamsFilters,
              attendee: teamsFilters.attendee
            }
          )
        )
      );
  }

  public selectAttendee(): Observable<string> {
    return this.store.select(teamsAttendeeSelector);
  }

}
