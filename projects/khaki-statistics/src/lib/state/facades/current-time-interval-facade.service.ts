import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {select, Store} from '@ngrx/store';
import {IntervalEnum} from '../../services/models/interval.enum';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {Observable} from 'rxjs';
import {currentTimeIntervalFeatureKey} from '../reducers/current-time-interval.reducer';
import {HistorianService, Logging} from '@natr/historian';
import {tap} from 'rxjs/operators';
import {currentTimeIntervalSelector} from '../statistics.selectors';

@Logging
@Injectable({
  providedIn: 'root'
})
export class CurrentTimeIntervalFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<StatisticsFeature>) {
  }

  setCurrentTimeInterval(interval: IntervalEnum): void {
    this.store.dispatch(setCurrentTimeIntervalAction({interval}));
  }

  currentTimeInterval(): Observable<IntervalEnum> {
    return this.store.pipe(select(currentTimeIntervalSelector));
  }
}
