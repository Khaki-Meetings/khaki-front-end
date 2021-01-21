import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {UserProfileResponseDto} from './models/userProfileResponseDto';
import {EmployeesResponseDto} from './models/employeesResponseDto';
import {DepartmentsResponseDto} from './models/departmentsResponseDto';
import {OrganizationResponseDto} from './models/organizationResponseDto';
import {Moment} from 'moment/moment';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';


@Logging
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  getCompany(): Observable<OrganizationResponseDto> {
    let url = '/assets/organizationData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/organizations`;
    }
    return this.httpClient.get(url)
      .pipe(
        tap(data => this.logger.debug('org data response', data)),
        map(data => data as OrganizationResponseDto)
      );
  }

  getUserProfile(): Observable<UserProfileResponseDto> {
    let url = '/assets/userProfileData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/employees/userProfile`;
    }
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: UserProfileResponseDto) => data as UserProfileResponseDto
        )
      );
  }

  setUserProfile(postData: UserProfileResponseDto): Observable<UserProfileResponseDto> {
    const url = '/assets/userProfileData.json';
    return this.httpClient
      // .post(url, postdata) //TODO move to post when backend ready
      .get(url)
      .pipe(
        map(
          (data: UserProfileResponseDto) => data as UserProfileResponseDto
        ),
      );
  }

  getEmployees(): Observable<EmployeesResponseDto> {
    let url = '/assets/employeesData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/employees`;
    }
    return this.httpClient.get<EmployeesResponseDto>(url).pipe(tap(data => this.logger.debug('employee list', data)));
  }

  getEmployeeStats(employeeId: string, start: Moment, end: Moment): Observable<any> {
    const url = `${this.environment.khakiBff}/statistics/individual/${employeeId}/${start.format()}/${end.format()}`;
    this.logger.debug('url', url);
    return this.httpClient
      .get<TimeBlockSummaryResponseDto>(url);
  }

  getDepartments(): Observable<DepartmentsResponseDto> {
    let url = '/assets/departmentsData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/departments`;
    }
    return this.httpClient.get<DepartmentsResponseDto>(url).pipe(tap(data => this.logger.debug('department list', data)));
  }
}
