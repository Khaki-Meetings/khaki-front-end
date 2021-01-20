import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {loadUserProfile} from '../actions/user-profile.actions';
import {userProfileSelector} from '../settings.selectors';
import { SettingsService } from '../../services/settings.service';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFacadeService {

  constructor(private store: Store<KhakiSettingsFeatureSm>, private service: SettingsService) {
  }

  requestUserProfile(): void {
    this.store.dispatch(loadUserProfile({}));
  }

  userProfile(): Observable<UserProfileResponseDto> {
    return this.store.select(userProfileSelector);
  }

  setUserProfile(data: UserProfileResponseDto): Observable<UserProfileResponseDto> {
    return this.service.setUserProfile(data);
  }

}
