import {TestBed} from '@angular/core/testing';

import {StatisticsService} from './statistics.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
import {IntervalEnum} from './models/interval.enum';
import * as moment from 'moment';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpMock: HttpTestingController;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule]
      }
    );
    service = TestBed.inject(StatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
    mockHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'getOrganizersStatistics should return correct Sm object',
    () => {
      const organizersStatisticsSm: OrganizersStatisticsSm = {};
      const organizersStatisticsDto: OrganizersStatisticsDto = {};

      service.getAggregateOrganizersStatistics(moment(), moment(), {})
        .subscribe(
          organizersStatistics => {
            expect(organizersStatistics).toEqual(organizersStatisticsSm);
          }
        );

      const req = httpMock.expectOne('/assets/organizersWeekData.json');
      expect(req.request.method).toEqual('GET');
      req.flush(organizersStatisticsDto);

      httpMock.verify();
    }
  );
});
