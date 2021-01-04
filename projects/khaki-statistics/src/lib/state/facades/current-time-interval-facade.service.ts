import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {select, Store} from '@ngrx/store';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {Observable} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {currentTimeIntervalSelector} from '../statistics.selectors';
import {IntervalSe} from '../models/interval-se';

@Logging
@Injectable({providedIn: 'root'})
export class CurrentTimeIntervalFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<StatisticsFeature>) {
  }

  setCurrentTimeInterval(interval: IntervalSe): void {
    this.store.dispatch(setCurrentTimeIntervalAction({interval}));
  }

  currentTimeInterval(): Observable<IntervalSe> {
    return this.store.pipe(select(currentTimeIntervalSelector));
  }
}
