import {NgModule} from '@angular/core';
import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {KhakiStatisticsRoutingModule} from './khaki-statistics-routing.module';
import {PerDepartmentGraphComponent} from './components/per-department-graph/per-department-graph.component';
import {OrganizersTableComponent} from './components/organizers-table/organizers-table.component';
import {TwelveMonthTrailingGraphComponent} from './components/twelve-month-trailing-graph/twelve-month-trailing-graph.component';
import {TimeBasedStatSummaryComponent} from './components/time-based-stat-summary/time-based-stat-summary.component';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiStatistics from './state';
import {EffectsModule} from '@ngrx/effects';
import {TimeBlockSummariesEffects} from './state/effects/time-block-summaries.effects';
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


@NgModule({
  declarations: [
    KhakiStatisticsComponent,
    PerDepartmentGraphComponent,
    OrganizersTableComponent,
    TwelveMonthTrailingGraphComponent,
    TimeBasedStatSummaryComponent
  ],
  imports: [
    KhakiStatisticsRoutingModule,
    CommonModule,
    StoreModule.forFeature(
      fromKhakiStatistics.khakiStatisticsFeatureKey,
      fromKhakiStatistics.reducers,
      {
        metaReducers: fromKhakiStatistics.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        TimeBlockSummariesEffects,
        OrganizersStatisticsEffects,
        TrailingStatisticsEffects,
        PerDepartmentStatisticsEffects
      ]
    ),
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatTableModule,
    // BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxChartsModule
  ],
  exports: [KhakiStatisticsComponent]
})
export class KhakiStatisticsModule {
}
