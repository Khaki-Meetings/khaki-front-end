import { Injectable } from '@angular/core';
import {TimeBlockEnum} from '../models/time-block.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrailingStatisticsFacadeService {

  constructor() { }

  requestTrailingStatistics(timeBlock: TimeBlockEnum, count: number): void {
    throw Error('not implemented');
  }
}
