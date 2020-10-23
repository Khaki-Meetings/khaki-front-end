import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiStatisticsComponent} from './khaki-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiStatisticsComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class KhakiStatisticsRoutingModule { }
