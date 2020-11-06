import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

@Injectable({
  providedIn: 'root'
})
export class TrailingStatisticsFacadeService {

  constructor() {
  }

  requestTrailingStatistics(timeBlock: IntervalEnum, count: number): void {
    throw Error('not implemented');
  }

  trailingStatistics(): Observable<TrailingStatisticsSm> {
    throw Error('not implemented');
  }
}
