import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {setMeetingsTablePageablesAction} from './meetings-table-pageable.actions';
import {Observable} from 'rxjs';
import {MeetingsTablePageableSm} from './meetings-table-pageable.reducer';
import {selectMeetingsTablePageableState} from './meetings-table-pageable.selectors';
import {SortDirection} from '@angular/material/sort';

@Injectable({providedIn: 'root'})
export class MeetingsTablePageableFacade {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public dispatchSetMeetingsTablePageables(page: number, count: number, sortColumn?: string, sortDirection?: SortDirection): void {
    this.store.dispatch(setMeetingsTablePageablesAction({page, count, sortColumn, sortDirection}));
  }

  public selectMeetingsTablePageable(): Observable<MeetingsTablePageableSm> {
    return this.store.select(selectMeetingsTablePageableState);
  }
}
