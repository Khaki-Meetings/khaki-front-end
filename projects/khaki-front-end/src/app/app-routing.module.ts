import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('khaki-statistics').then(m => m.KhakiStatisticsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('khaki-profile').then(m => m.KhakiProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
