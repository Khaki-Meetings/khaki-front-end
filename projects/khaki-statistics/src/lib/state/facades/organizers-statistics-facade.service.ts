import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';

@Injectable({
  providedIn: 'root'
})
export class OrganizersStatisticsFacadeService {

  constructor() {
  }

  requestOrganizersStatistics(): void {
    throw new NotImplementedException();
  }

  organizersStatistics(): Observable<OrganizersStatisticsSm> {
    throw new NotImplementedException();
  }

  setOrganizersStatistics(data: OrganizersStatisticsSm): void {
    throw new NotImplementedException();
  }

}
