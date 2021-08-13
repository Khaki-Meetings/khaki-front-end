import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {UserProfileResponseDto} from './models/userProfileResponseDto';
import {EmployeeDto, EmployeesResponseDto} from './models/employeesResponseDto';
import {DepartmentDto, DepartmentsResponseDto, DepartmentsResponsePageableDto} from './models/departmentsResponseDto';
import {OrganizationResponseDto} from './models/organizationResponseDto';
import {Moment} from 'moment/moment';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import { SortDirection } from '@angular/material/sort';
import {StatisticsQueryParameters} from './models/statistics-query-parameters';

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

  updateEmployee(id: string, employeeData: EmployeeDto): Observable<EmployeeDto> {
    let url = '/assets/userProfileData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/employees/userProfile/${id}`;
    }
    return this.httpClient
      .put(url, employeeData)
      .pipe(
        map(
          (data: EmployeeDto) => data as EmployeeDto
        ),
      );
  }

  createEmployee(employeeData: EmployeeDto): Observable<EmployeeDto> {
    let url = '/assets/userProfileData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/employees/userProfile`;
    }
    return this.httpClient
      .post(url, employeeData)
      .pipe(
        map(
          (data: EmployeeDto) => data as EmployeeDto
        ),
      );
  }

  getEmployees(statisticsQueryParams: StatisticsQueryParameters): Observable<EmployeesResponseDto> {
    let url = '/assets/employeesData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/employees`;
    }

    let params = new HttpParams();
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'person.lastName';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);

    return this.httpClient
      .get<EmployeesResponseDto>(url, {params})
      .pipe(tap(data => this.logger.debug('employee list', data)));
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

  getDepartmentsPageable(statisticsQueryParams: StatisticsQueryParameters): Observable<DepartmentsResponsePageableDto> {
    let url = '/assets/departmentsPageableData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/departments`;
    }

    let params = new HttpParams();
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '10';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'name';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);

    return this.httpClient
      .get<DepartmentsResponsePageableDto>(url, {params})
      .pipe(tap(data => this.logger.debug('departments list', data)));
  }

  addDepartment(name: string): Observable<DepartmentDto> {
    let url = '/assets/userProfileData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/departments`;
    }
    return this.httpClient
      .post(url, name)
      .pipe(
        map(
          (data: DepartmentDto) => data as DepartmentDto
        ),
      );
  }

  updateDepartment(id: string, departmentData: DepartmentDto): Observable<DepartmentDto> {
    let url = '/assets/departmentsData.json';
    if (this.environment.khakiBff) {
      url = `${this.environment.khakiBff}/departments/${id}`;
    }
    return this.httpClient
      .put(url, departmentData.name)
      .pipe(
        map(
          (data: DepartmentDto) => data as DepartmentDto
        ),
      );
  }

}
