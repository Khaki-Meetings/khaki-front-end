import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';

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
    throw Error('not implemented');
  }
}
