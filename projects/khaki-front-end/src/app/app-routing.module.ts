import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('khaki-statistics').then(m => m.KhakiStatisticsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('khaki-profile').then(m => m.KhakiProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('khaki-settings').then(m => m.KhakiSettingsModule)
  },
  {
    path: 'info',
    loadChildren: () => import('khaki-info').then(m => m.KhakiInfoModule)
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
