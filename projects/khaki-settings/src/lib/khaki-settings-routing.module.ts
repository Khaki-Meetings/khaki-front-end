import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KhakiSettingsComponent} from './khaki-settings.component';
import {SettingsNameComponent} from './components/settings-name/settings-name.component';
import {SettingsEmployeesComponent} from './components/settings-employees/settings-employees.component';
import {SettingsEmployeeComponent} from './components/settings-employee/settings-employee.component';
import {SettingsDepartmentComponent} from './components/settings-department/settings-department.component';

const routes: Routes = [
  {
    path: '',
    component: KhakiSettingsComponent,
    children: [
      {
        path: 'name',
        component: SettingsNameComponent
      },
      {
        path: 'employees',
        component: SettingsEmployeesComponent
      },
      {
        path: 'employee',
        component: SettingsEmployeeComponent
      },
      {
        path: 'department',
        component: SettingsDepartmentComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhakiSettingsRoutingModule {
}
