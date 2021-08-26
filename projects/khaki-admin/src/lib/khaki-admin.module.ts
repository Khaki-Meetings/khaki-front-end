import {NgModule} from '@angular/core';
import {KhakiAdminComponent} from './khaki-admin.component';
import {RouterModule, Routes} from '@angular/router';
import {ClientOnboardingComponent} from './components/client-onboarding/client-onboarding.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiAdmin from './state';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {EffectsModule} from '@ngrx/effects';
import {ClientOnboardingEffects} from './state/client-onboarding/client-onboarding.effects';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(fromKhakiAdmin.khakiAdminFeatureKey, fromKhakiAdmin.reducers, {metaReducers: fromKhakiAdmin.metaReducers}),
    EffectsModule.forFeature([ClientOnboardingEffects]),
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [KhakiAdminComponent]
})
export class KhakiAdminModule {
}
