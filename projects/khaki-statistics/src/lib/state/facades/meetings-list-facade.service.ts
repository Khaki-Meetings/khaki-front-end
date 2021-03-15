import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MeetingsListSm} from '../models/meetings-list-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadMeetingsListAction} from '../actions/meetings-list.actions';
import {meetingsListLoadingSelector, meetingsListSelector} from '../statistics.selectors';

@Injectable({
  providedIn: 'root'
})
export class MeetingsListFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  dispatchLoadMeetingsList(): void {
    this.store.dispatch(loadMeetingsListAction());
  }

  selectMeetingsList(): Observable<MeetingsListSm> {
    return this.store.select(meetingsListSelector);
  }

  selectMeetingsListLoading(): Observable<boolean> {
    return this.store.select(meetingsListLoadingSelector);
  }

  setMeetingsList(data: MeetingsListSm): void {
    throw new NotImplementedException();
  }

}
