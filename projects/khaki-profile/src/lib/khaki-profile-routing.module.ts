import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiProfileComponent} from './khaki-profile.component';
import {ProfileNameComponent} from './components/profile-name/profile-name.component';
import {ProfileEmailComponent} from './components/profile-email/profile-email.component';
import {ProfileNotificationsComponent} from './components/profile-notifications/profile-notifications.component';
import {ProfileHelpComponent} from './components/profile-help/profile-help.component';
import {ProfileLogoutComponent} from './components/profile-logout/profile-logout.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiProfileComponent,
    children: [
      {
        path: 'name',
        component: ProfileNameComponent
      },
      {
        path: 'email',
        component: ProfileEmailComponent
      },
      {
        path: 'notifications',
        component: ProfileNotificationsComponent
      },
      {
        path: 'help',
        component: ProfileHelpComponent
      },
      {
        path: 'logout',
        component: ProfileLogoutComponent
      }
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiProfileRoutingModule {
}
