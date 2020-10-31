import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizersStatisticsFacadeService {

  constructor() {
  }

  requestOrganizersStatistics(): void {
    throw Error('not implemented');
  }

  organizersStatistics(): Observable<OrganizersStatisticsSm> {
    return of(
      {
        page: 1,
        organizers: [
          {
            organizer: {name: 'bob Jones'},
            totalCost: 100,
            totalHours: 100,
            totalMeetings: 100
          }
        ],
        error: null
      } as OrganizersStatisticsSm
    )
      .pipe(delay(500))
      ;
  }
}
