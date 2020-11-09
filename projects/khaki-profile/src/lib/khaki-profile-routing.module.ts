import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiProfileComponent} from './khaki-profile.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiProfileComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiProfileRoutingModule {
}
