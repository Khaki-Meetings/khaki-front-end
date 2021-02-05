import {NgModule} from '@angular/core';
import {KhakiAdminComponent} from './khaki-admin.component';
import {RouterModule, Routes} from '@angular/router';
import {ClientOnboardingComponent} from './components/client-onboarding/client-onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiAdminComponent,
    children: [
      {path: '', component: ClientOnboardingComponent}
    ]
  }
];

@NgModule({
  declarations: [KhakiAdminComponent, ClientOnboardingComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [KhakiAdminComponent]
})
export class KhakiAdminModule {
}
