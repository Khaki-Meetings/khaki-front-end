import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiInfoComponent} from './khaki-info.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiInfoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiInfoRoutingModule {
}
