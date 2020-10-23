import { NgModule } from '@angular/core';
import { KhakiStatisticsComponent } from './khaki-statistics.component';
import {KhakiStatisticsRoutingModule} from './khaki-statistics-routing.module';
import { PerDepartmentGraphComponent } from './components/per-department-graph/per-department-graph.component';
import { OrganizersTableComponent } from './components/organizers-table/organizers-table.component';
import { TwelveMonthTrailingGraphComponent } from './components/twelve-month-trailing-graph/twelve-month-trailing-graph.component';
import { TimeBasedStatSummaryComponent } from './components/time-based-stat-summary/time-based-stat-summary.component';



@NgModule({
  declarations: [KhakiStatisticsComponent, PerDepartmentGraphComponent, OrganizersTableComponent, TwelveMonthTrailingGraphComponent, TimeBasedStatSummaryComponent],
  imports: [
    KhakiStatisticsRoutingModule
  ],
  exports: [KhakiStatisticsComponent]
})
export class KhakiStatisticsModule { }
