import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiMeetingsComponent} from './khaki-meetings.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiMeetingsComponent,
    children: [
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiMeetingsRoutingModule {
}
