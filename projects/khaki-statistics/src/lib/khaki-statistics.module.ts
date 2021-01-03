import {NgModule} from '@angular/core';
import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {KhakiStatisticsRoutingModule} from './khaki-statistics-routing.module';
import {PerDepartmentGraphComponent} from './components/per-department-graph/per-department-graph.component';
import {OrganizersTableComponent} from './components/organizers-table/organizers-table.component';
import {TrailingStatisticsGraphComponent} from './components/twelve-month-trailing-graph/trailing-statistics-graph.component';
import {TimeBasedStatSummaryComponent} from './components/time-based-stat-summary/time-based-stat-summary.component';
import {NgxChartsLegendCustomComponent} from './components/ngx-charts-legend-custom/ngx-charts-legend-custom.component';
import {LegendEntryCustomComponent} from './components/legend-entry-custom/legend-entry-custom.component';
import {StoreModule} from '@ngrx/store';
import * as fromKhakiStatistics from './state';
import {EffectsModule} from '@ngrx/effects';
import {TimeBlockSummaryEffects} from './state/effects/time-block-summary.effects';
import {OrganizersStatisticsEffects} from './state/effects/organizers-statistics.effects';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {TimeIntervalFormComponent} from './components/time-interval-form/time-interval-form.component';
import {StatisticsFiltersChangeEffects} from './state/effects/statistics-filters-change.effects';
import {AuthHttpInterceptor} from '@auth0/auth0-angular';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ExternalInternalSelectorComponent } from './components/external-internal-selector/external-internal-selector.component';


@NgModule({
  declarations: [
    KhakiStatisticsComponent,
    PerDepartmentGraphComponent,
    OrganizersTableComponent,
    TrailingStatisticsGraphComponent,
    TimeBasedStatSummaryComponent,
    TimeIntervalFormComponent,
    NgxChartsLegendCustomComponent,
    LegendEntryCustomComponent,
    ExternalInternalSelectorComponent
  ],
    imports: [
        ReactiveFormsModule,
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
                TimeBlockSummaryEffects,
                OrganizersStatisticsEffects,
                TrailingStatisticsEffects,
                PerDepartmentStatisticsEffects,
                StatisticsFiltersChangeEffects
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
        MatPaginatorModule
    ],
  exports: [KhakiStatisticsComponent],
  providers: [
  ]
})
export class KhakiStatisticsModule {
}
