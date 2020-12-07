import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {SettingsEffects} from './user-profile.effects';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {loadUserProfile} from '../actions/user-profile.actions';
import {SettingsService} from '../../services/settings.service';
import {UserProfileResponseDto} from '../../services/models/userProfileResponseDto';
import {UserProfileFacadeService} from '../facades/user-profile-facade.service';
import {UserProfileSm} from '../models/user-profile-sm';

describe('OrganizersStatisticsEffects', () => {
  let actions$: Observable<Action>;
  let effects: SettingsEffects;
  let settingsService: Partial<SettingsService>;
  let userProfileFacade: Partial<UserProfileFacadeService>;
  const organizersStatisticsData: UserProfileResponseDto = {};
});
