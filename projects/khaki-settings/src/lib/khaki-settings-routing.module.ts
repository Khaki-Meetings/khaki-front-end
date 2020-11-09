import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiSettingsComponent} from './khaki-settings.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiSettingsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiSettingsRoutingModule {
}
