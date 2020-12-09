import {NgModule} from '@angular/core';
import {KhakiProfileComponent} from './khaki-profile.component';
import {KhakiProfileRoutingModule} from './khaki-profile-routing.module';
import {ProfileHeaderComponent} from './components/profile-header/profile-header.component';
import {ProfileMainComponent} from './components/profile-main/profile-main.component';
import {ProfileEmailComponent} from './components/profile-email/profile-email.component';
import {ProfileOptionsComponent} from './components/profile-options/profile-options.component';
import {ProfileNotificationsComponent} from './components/profile-notifications/profile-notifications.component';
import {ProfileLogoutComponent} from './components/profile-logout/profile-logout.component';
import {ProfileHelpComponent} from './components/profile-help/profile-help.component';
import {ProfileNameComponent} from './components/profile-name/profile-name.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromKhakiProfile from './state';
import { ProfileEffects } from './state/effects/user-profile.effects';

@NgModule({
  declarations: [
    KhakiProfileComponent,
    ProfileHeaderComponent,
    ProfileMainComponent,
    ProfileEmailComponent,
    ProfileOptionsComponent,
    ProfileNotificationsComponent,
    ProfileLogoutComponent,
    ProfileHelpComponent,
    ProfileNameComponent
  ],
  imports: [
    KhakiProfileRoutingModule,
    MatIconModule,
    CommonModule,
    StoreModule.forFeature(
      fromKhakiProfile.khakiProfileFeatureKey,
      fromKhakiProfile.reducers,
      {
        metaReducers: fromKhakiProfile.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        ProfileEffects,
      ]
    ),
  ],
  exports: [KhakiProfileComponent]
})
export class KhakiProfileModule {
}
