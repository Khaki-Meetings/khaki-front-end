import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';

@Injectable({
  providedIn: 'root'
})
export class SinceTimeBlockSummariesFacadeService {

  constructor() {
  }

  requestTimeBlockSummaries(): void {
    throw Error('not implemented');
  }

  timeBlockSummaries(): Observable<TimeBlockSummarySm> {
    throw Error('not implemented');
  }
}
