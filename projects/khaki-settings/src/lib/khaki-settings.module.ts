import { NgModule } from '@angular/core';
import { KhakiSettingsComponent } from './khaki-settings.component';
import {KhakiSettingsRoutingModule} from './khaki-settings-routing.module';
import {SettingsHeaderComponent} from './components/settings-header/settings-header.component'
import {SettingsMainComponent} from './components/settings-main/settings-main.component'
import {SettingsOptionsComponent} from './components/settings-options/settings-options.component'
import {SettingsNameComponent} from './components/settings-name/settings-name.component'
import {SettingsEmployeesComponent} from './components/settings-employees/settings-employees.component'
import {SettingsEmployeeComponent} from './components/settings-employee/settings-employee.component'
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    KhakiSettingsComponent,
    SettingsHeaderComponent,
    SettingsMainComponent,
    SettingsOptionsComponent,
    SettingsNameComponent,
    SettingsEmployeesComponent,
    SettingsEmployeeComponent
  ],
  imports: [
    KhakiSettingsRoutingModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    KhakiSettingsComponent
  ]
})
export class KhakiSettingsModule { }
