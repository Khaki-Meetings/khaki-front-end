import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {UserProfileResponseDto} from './models/userProfileResponseDto'
import { UserProfileSm } from '../state/models/user-profile-sm';

@Logging
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient) { }
  
  getUserProfile(): Observable<UserProfileSm> {
    const url = '/assets/userProfileData.json';
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: UserProfileResponseDto) => data as UserProfileSm
        ),
      );
  }

  setUserProfile(data: UserProfileSm): Observable<UserProfileSm> {
    const url = '/assets/userProfileData.json';
    return this.httpClient
      .post(url, data)
      .pipe(
        map(
          (data: UserProfileResponseDto) => data as UserProfileSm
        ),
      );
  }
}
