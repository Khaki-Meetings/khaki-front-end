import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AllStatisticsFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestAllStatistics(): void {
  }
}
