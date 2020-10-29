import {Injectable} from '@angular/core';
import {TimeBlockEnum} from '../models/time-block.enum';
import {Observable} from 'rxjs';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';

@Injectable({
  providedIn: 'root'
})
export class TrailingStatisticsFacadeService {

  constructor() {
  }

  requestTrailingStatistics(timeBlock: TimeBlockEnum, count: number): void {
    throw Error('not implemented');
  }

  trailingStatistics(): Observable<TrailingStatisticsSm> {
    throw Error('not implemented');
  }
}
