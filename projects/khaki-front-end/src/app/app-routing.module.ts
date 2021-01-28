import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@auth0/auth0-angular';
import {MainComponent} from './components/main/main.component';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'AppRoutingModule');

const routes: Routes = [
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'stats',
    loadChildren: () => import('khaki-statistics')
      .then(
        m => {
          logger.debug('m', m);
          logger.debug('KhakiStatisticsModule', m.KhakiStatisticsModule);
          return m.KhakiStatisticsModule;
        }
    ),
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
    redirectTo: 'stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
