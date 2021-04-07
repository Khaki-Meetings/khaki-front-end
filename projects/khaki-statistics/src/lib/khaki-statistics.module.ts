import {NgModule} from '@angular/core';
import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {KhakiStatisticsRoutingModule} from './khaki-statistics-routing.module';
import {PerDepartmentGraphComponent} from './components/per-department-graph/per-department-graph.component';
import {OrganizersTableComponent} from './components/organizers-table/organizers-table.component';
import {MtgInvBarChartComponent} from './components/mtg-inv-bar-chart/mtg-inv-bar-chart.component';
import {MeetingsListComponent} from './components/meetings-list/meetings-list.component';
import {TrailingStatisticsGraphComponent} from './components/twelve-month-trailing-graph/trailing-statistics-graph.component';
import {TimeBasedStatSummaryComponent} from './components/time-based-stat-summary/time-based-stat-summary.component';
import {TimeBasedStatComponent} from './components/time-based-stat/time-based-stat.component';
import {NgxChartsLegendCustomComponent} from './components/ngx-charts-legend-custom/ngx-charts-legend-custom.component';
import {LegendEntryCustomComponent} from './components/legend-entry-custom/legend-entry-custom.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TimeBlockSummaryEffects} from './state/effects/time-block-summary.effects';
import {OrganizersStatisticsEffects} from './state/effects/organizers-statistics.effects';
import {MeetingsListEffects} from './state/effects/meetings-list.effects';
import {TrailingStatisticsEffects} from './state/effects/trailing-statistics.effects';
import {PerDepartmentStatisticsEffects} from './state/effects/per-department-statistics.effects';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {TimeIntervalFormComponent} from './components/time-interval-form/time-interval-form.component';
import {StatisticsFiltersChangeEffects} from './state/effects/statistics-filters-change.effects';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ExternalInternalSelectorComponent} from './components/external-internal-selector/external-internal-selector.component';
import {OrganizersTablePageableEffects} from './state/organizers-table-pageable/organizers-table-pageable.effects';
import {MeetingsTablePageableEffects} from './state/meetings-table-pageable/meetings-table-pageable.effects';
import {khakiStatisticsFeatureKey, khakiStatisticsMetaReducers, khakiStatisticsReducers} from './state';
import {StatisticsFiltersFacade} from './state/statistics-filters/statistics-filters-facade';
import {HistorianService, Logging} from '@natr/historian';
import {HoursMinutesPipe} from './pipes/hours-minutes.pipe';
import {IntervalTextDetailPipe} from './pipes/interval-text-detail.pipe';
import {MeetingTypeDetailPipe} from './pipes/meeting-type-detail.pipe';
import {MeetingStartDatePipe} from './pipes/meeting-start-date.pipe';
import {MeetingStartEndTimesPipe} from './pipes/meeting-start-end-times.pipe';
import {KhakiSpinnerComponent} from './components/khaki-spinner/khaki-spinner.component';
import {OrganizersStatisticsDataSource} from './components/organizers-table/data-source/organizers-statistics-data-source';
import {MeetingsListDataSource} from './components/meetings-list/data-source/meetings-list-data-source';
import {MatSortModule} from '@angular/material/sort';
import { MtgInvPercChartComponent } from './components/mtg-inv-perc-chart/mtg-inv-perc-chart.component';
import { OrganizersAggregateStatisticsDataSource } from './components/organizers-table/data-source/organizers-aggregate-statistics-data-source';
import { OrganizersAggregateStatisticsEffects } from './state/effects/organizers-aggregate-statistics-effects';
import { TimeBlockSummaryGoalEffects } from './state/effects/time-block-summary-goal.effects';
import { GoalDisplayPipe } from './pipes/goal-display.pipe';
import { GoalDisplayHoursMinutesPipe } from './pipes/goal-display-hours-minutes.pipe';

@NgModule({
  declarations: [
    KhakiStatisticsComponent,
    PerDepartmentGraphComponent,
    OrganizersTableComponent,
    MtgInvBarChartComponent,
    MeetingsListComponent,
    TrailingStatisticsGraphComponent,
    TimeBasedStatSummaryComponent,
    TimeBasedStatComponent,
    TimeIntervalFormComponent,
    NgxChartsLegendCustomComponent,
    LegendEntryCustomComponent,
    ExternalInternalSelectorComponent,
    KhakiSpinnerComponent,
    HoursMinutesPipe,
    IntervalTextDetailPipe,
    MeetingTypeDetailPipe,
    MeetingStartDatePipe,
    MeetingStartEndTimesPipe,
    GoalDisplayPipe,
    GoalDisplayHoursMinutesPipe,
    MtgInvPercChartComponent
  ],
  imports: [
    ReactiveFormsModule,
    KhakiStatisticsRoutingModule,
    CommonModule,
    StoreModule.forFeature(
      khakiStatisticsFeatureKey,
      khakiStatisticsReducers,
      {
        metaReducers: khakiStatisticsMetaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        TimeBlockSummaryEffects,
        TimeBlockSummaryGoalEffects,
        OrganizersAggregateStatisticsEffects,
        MeetingsListEffects,
        TrailingStatisticsEffects,
        PerDepartmentStatisticsEffects,
        StatisticsFiltersChangeEffects,
        OrganizersTablePageableEffects,
        MeetingsTablePageableEffects
      ]
    ),
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxChartsModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [KhakiStatisticsComponent],
  providers: [OrganizersAggregateStatisticsDataSource, MeetingsListDataSource]
})
@Logging
export class KhakiStatisticsModule {
  private logger: HistorianService;

  constructor(public statisticsFiltersFacade: StatisticsFiltersFacade) {
    this.logger.debug('statisticsFiltersFacade', statisticsFiltersFacade);
    statisticsFiltersFacade.dispatchLoadSharedStatistics();
  }

}
