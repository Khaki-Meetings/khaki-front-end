import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {UserProfileResponseDto} from './models/userProfileResponseDto';
import { EmployeesResponseDto } from './models/employeesResponseDto';
import { DepartmentsResponseDto } from './models/departmentsResponseDto';

@Logging
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient) { }

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

  setUserProfile(postdata: UserProfileResponseDto): Observable<UserProfileResponseDto> {
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
    const url = '/assets/employeesData.json';
    return this.httpClient
      .get<EmployeesResponseDto>(url);
  }

  getDepartments(): Observable<DepartmentsResponseDto> {
    const url = '/assets/departmentsData.json';
    return this.httpClient
      .get<DepartmentsResponseDto>(url);
  }
}
