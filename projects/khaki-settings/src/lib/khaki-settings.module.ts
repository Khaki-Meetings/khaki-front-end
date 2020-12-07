import { NgModule } from '@angular/core';
import { KhakiSettingsComponent } from './khaki-settings.component';
import {KhakiSettingsRoutingModule} from './khaki-settings-routing.module';
import {SettingsHeaderComponent} from './components/settings-header/settings-header.component'
import {SettingsMainComponent} from './components/settings-main/settings-main.component'
import {SettingsOptionsComponent} from './components/settings-options/settings-options.component'
import {SettingsNameComponent} from './components/settings-name/settings-name.component'
import {SettingsEmployeesComponent, AddEmployeeDialog} from './components/settings-employees/settings-employees.component'
import {SettingsEmployeeComponent} from './components/settings-employee/settings-employee.component'
import {SettingsDepartmentComponent, AddDepartmentDialog} from './components/settings-department/settings-department.component'
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiSettings from './state';
import {EffectsModule} from '@ngrx/effects';
import { SettingsEffects } from './state/effects/user-profile.effects';

@NgModule({
  declarations: [
    KhakiSettingsComponent,
    SettingsHeaderComponent,
    SettingsMainComponent,
    SettingsOptionsComponent,
    SettingsNameComponent,
    SettingsEmployeesComponent,
    SettingsEmployeeComponent,
    SettingsDepartmentComponent,
    AddEmployeeDialog,
    AddDepartmentDialog
  ],
  imports: [
    KhakiSettingsRoutingModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature(
      fromKhakiSettings.khakiProfileFeatureKey,
      fromKhakiSettings.reducers,
      {
        metaReducers: fromKhakiSettings.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        SettingsEffects
      ]
    ),
  ],
  exports: [
    KhakiSettingsComponent
  ]
})
export class KhakiSettingsModule { }
