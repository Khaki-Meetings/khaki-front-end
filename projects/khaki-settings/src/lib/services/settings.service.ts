import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {UserProfileResponseDto} from './models/userProfileResponseDto';
import {EmployeesResponseDto} from './models/employeesResponseDto';
import {DepartmentsResponseDto} from './models/departmentsResponseDto';
import {OrganizationResponseDto} from './models/organization-response.dto';

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
    if (!this.environment.uiOnly) {
      url = `${this.environment.khakiBff}/organizations`;
    }
    return this.httpClient.get(url)
      .pipe(
        tap(data => this.logger.debug('org data response', data)),
        map(data => data as OrganizationResponseDto)
      );
  }

  getUserProfile(): Observable<UserProfileResponseDto> {
    const url = '/assets/userProfileData.json';
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: UserProfileResponseDto) => data as UserProfileResponseDto
        ),
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
    if (!this.environment.uiOnly) {
      url = `${this.environment.khakiBff}/employees`;
    }
    return this.httpClient.get<EmployeesResponseDto>(url).pipe(tap(data => this.logger.debug('employee list', data)));
  }

  getDepartments(): Observable<DepartmentsResponseDto> {
    let url = '/assets/departmentsData.json';
    if (!this.environment.uiOnly) {
      url = `${this.environment.khakiBff}/departments`;
    }
    return this.httpClient
      .get<DepartmentsResponseDto>(url);
  }
}
