import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {IntervalEnum} from '../../services/models/interval.enum';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';

@Injectable({
  providedIn: 'root'
})
export class CurrentTimeIntervalFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  setCurrentTimeInterval(interval: IntervalEnum): void {
    this.store.dispatch(setCurrentTimeIntervalAction({interval}));
  }
}
