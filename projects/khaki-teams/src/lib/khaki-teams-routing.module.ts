import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiTeamsComponent} from './khaki-teams.component';
import {TeamComponent} from './components/team/team.component';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiTeamsComponent,
    children: [
      {
        path: '',
        component: TeamComponent
      },
      {
        path: 'meetings',
        component: MeetingsListComponent
      }
    ]
  },
  {path: 'teams', component: TeamComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiTeamsRoutingModule {
}
