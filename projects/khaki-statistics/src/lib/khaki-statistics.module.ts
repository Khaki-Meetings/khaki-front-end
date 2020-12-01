import {NgModule} from '@angular/core';
import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {KhakiStatisticsRoutingModule} from './khaki-statistics-routing.module';
import {PerDepartmentGraphComponent} from './components/per-department-graph/per-department-graph.component';
import {OrganizersTableComponent} from './components/organizers-table/organizers-table.component';
import {TwelveMonthTrailingGraphComponent} from './components/twelve-month-trailing-graph/twelve-month-trailing-graph.component';
import {TimeBasedStatSummaryComponent} from './components/time-based-stat-summary/time-based-stat-summary.component';
import {NgxChartsLegendCustomComponent} from './components/ngx-charts-legend-custom/ngx-charts-legend-custom.component';
import { LegendEntryCustomComponent } from './components/legend-entry-custom/legend-entry-custom.component';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiStatistics from './state';
import {EffectsModule} from '@ngrx/effects';
import {TimeBlockSummaryEffects} from './state/effects/time-block-summary.effects';
import {OrganizersStatisticsEffects} from './state/effects/organizers-statistics.effects';
import {TrailingStatisticsEffects} from './state/effects/trailing-statistics.effects';
import {PerDepartmentStatisticsEffects} from './state/effects/per-department-statistics.effects';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeIntervalFormComponent } from './components/time-interval-form/time-interval-form.component';
import { CurrentTimeIntervalEffects } from './state/effects/current-time-interval.effects';


@NgModule({
  declarations: [
    KhakiStatisticsComponent,
    PerDepartmentGraphComponent,
    OrganizersTableComponent,
    TwelveMonthTrailingGraphComponent,
    TimeBasedStatSummaryComponent,
    TimeIntervalFormComponent,
    NgxChartsLegendCustomComponent,
    LegendEntryCustomComponent
  ],
  imports: [
    ReactiveFormsModule,
    KhakiStatisticsRoutingModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromKhakiStatistics.khakiStatisticsFeatureKey,
      fromKhakiStatistics.reducers,
      {
        metaReducers: fromKhakiStatistics.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        TimeBlockSummaryEffects,
        OrganizersStatisticsEffects,
        TrailingStatisticsEffects,
        PerDepartmentStatisticsEffects,
        CurrentTimeIntervalEffects
      ]
    ),
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxChartsModule,
    MatSelectModule
  ],
  exports: [KhakiStatisticsComponent]
})
export class KhakiStatisticsModule {
}
