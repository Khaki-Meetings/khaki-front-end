import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserProfileSm} from '../models/user-profile-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {ProfileFeature} from '../models/profile-feature';
import {Store} from '@ngrx/store';
import {loadUserProfile} from '../actions/user-profile.actions';
import {userProfileSelector} from '../settings.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFacadeService {

  constructor(private store: Store<ProfileFeature>) {
  }

  requestUserProfile(): void {
    this.store.dispatch(loadUserProfile({}));
  }

  userProfile(): Observable<UserProfileSm> {
    return this.store.select(userProfileSelector);
  }

  setUserProfile(data: UserProfileSm): void {
    throw new NotImplementedException();
  }

}
