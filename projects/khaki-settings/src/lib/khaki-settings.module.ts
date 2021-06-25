import {NgModule} from '@angular/core';
import {KhakiSettingsComponent} from './khaki-settings.component';
import {KhakiSettingsRoutingModule} from './khaki-settings-routing.module';
import {SettingsHeaderComponent} from './components/settings-header/settings-header.component';
import {SettingsMainComponent} from './components/settings-main/settings-main.component';
import {SettingsOptionsComponent} from './components/settings-options/settings-options.component';
import {SettingsNameComponent} from './components/settings-name/settings-name.component';
import {SettingsEmployeesComponent, AddEmployeeDialogComponent} from './components/settings-employees/settings-employees.component';
import {SettingsEmployeeComponent} from './components/settings-employee/settings-employee.component';
import {SettingsDepartmentComponent, AddDepartmentDialogComponent} from './components/settings-department/settings-department.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiSettings from './state';
import {EffectsModule} from '@ngrx/effects';
import {SettingsEffects} from './state/effects/user-profile.effects';
import {EmployeesEffects} from './state/effects/employees.effects';
import {DepartmentsEffects} from './state/effects/departments.effects';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacade} from './state/statistics-filters/statistics-filters-facade';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HoursMinutesPipe} from './pipes/hours-minutes.pipe';
import {IntervalTextDetailPipe} from './pipes/interval-text-detail.pipe';
import {MeetingTypeDetailPipe} from './pipes/meeting-type-detail.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmployeesDataSource } from './components/settings-employees/data-source/employees-data-source';
import { EmployeesFacadeService } from './state/facades/employees-facade.service';
import { EmployeesTablePageableEffects } from './state/employees-table-pageable/employees-table-pageable.effects';
import { KhakiCommonModule } from 'khaki-common';

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
    AddEmployeeDialogComponent,
    AddDepartmentDialogComponent,
    HoursMinutesPipe,
    IntervalTextDetailPipe,
    MeetingTypeDetailPipe
  ],
  imports: [
    KhakiSettingsRoutingModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    KhakiCommonModule,
    StoreModule.forFeature(
      fromKhakiSettings.khakiSettingsFeatureKey,
      fromKhakiSettings.reducers,
      {
        metaReducers: fromKhakiSettings.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        SettingsEffects,
        EmployeesEffects,
        DepartmentsEffects,
        EmployeesTablePageableEffects
      ]
    ),
    MatProgressSpinnerModule,
  ],
  exports: [
    KhakiSettingsComponent
  ],
  providers: [EmployeesDataSource]
})
@Logging
export class KhakiSettingsModule {
  private logger: HistorianService;

  constructor(
        public employeesFacade: EmployeesFacadeService,
        private statisticsFiltersFacade: StatisticsFiltersFacade) {
    this.logger.debug('initiated');
    employeesFacade.requestEmployees();
    statisticsFiltersFacade.dispatchLoadSharedStatistics();
  }
}
