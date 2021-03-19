import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {MeetingsListComponent} from './components/meetings-list/meetings-list.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiStatisticsComponent
  },
  {
    path: 'meetings',
    component: MeetingsListComponent
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class KhakiStatisticsRoutingModule { }
