import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@auth0/auth0-angular';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'stats',
    loadChildren: () => import('khaki-statistics').then(m => m.KhakiStatisticsModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'meetings',
    loadChildren: () => import('khaki-meetings').then(m => m.KhakiMeetingsModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('khaki-profile').then(m => m.KhakiProfileModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'settings',
    loadChildren: () => import('khaki-settings').then(m => m.KhakiSettingsModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'info',
    loadChildren: () => import('khaki-info').then(m => m.KhakiInfoModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
   path: '',
   redirectTo: 'home',
   pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
