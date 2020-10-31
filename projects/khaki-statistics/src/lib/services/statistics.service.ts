import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../exceptions/not-implemented-exception';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() {
  }

  getOrganizersStatistics(): Observable<OrganizersStatisticsDto> {
    throw new NotImplementedException();
  }

}
