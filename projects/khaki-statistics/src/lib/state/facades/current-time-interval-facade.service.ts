import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {select, Store} from '@ngrx/store';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {Observable} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {IntervalSe} from '../models/interval-se';
import {statisticsIntervalSelector} from '../statistics-filters/statistics-filters.selectors';

@Logging
@Injectable({providedIn: 'root'})
export class CurrentTimeIntervalFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  setCurrentTimeInterval(interval: IntervalSe): void {
    this.store.dispatch(setCurrentTimeIntervalAction({interval}));
  }

  currentTimeInterval(): Observable<IntervalSe> {
    return this.store.pipe(select(statisticsIntervalSelector));
  }
}
