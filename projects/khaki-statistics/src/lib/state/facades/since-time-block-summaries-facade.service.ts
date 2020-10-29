import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SinceTimeBlockSummariesSm} from '../models/since-time-block-summaries-sm';

@Injectable({
  providedIn: 'root'
})
export class SinceTimeBlockSummariesFacadeService {

  constructor() {
  }

  requestTimeBlockSummaries(): void {
    throw Error('not implemented');
  }

  timeBlockSummaries(): Observable<SinceTimeBlockSummariesSm> {
    throw Error('not implemented');
  }
}
