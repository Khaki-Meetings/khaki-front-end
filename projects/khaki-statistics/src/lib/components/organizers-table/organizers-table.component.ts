import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {MatSort} from '@angular/material/sort';
import {OrganizersTablePageableFacade} from '../../state/organizers-table-pageable/organizers-table-pageable-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import { Router } from '@angular/router';
import { OrganizersAggregateStatisticsFacadeService } from '../../state/facades/organizers-aggregate-statistics-facade.service';
import { OrganizersAggregateStatisticsDataSource } from './data-source/organizers-aggregate-statistics-data-source';
import { OrganizersAggregateStatisticsSm } from '../../state/models/organizers-aggregate-statistics-sm';
import { GoogleAnalyticsService } from '../../google-analytics.service';

@Logging
@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})

export class OrganizersTableComponent implements OnInit, AfterViewInit {
  department: string;
  constructor(
    private organizersAggregateStatisticsFacade: OrganizersAggregateStatisticsFacadeService,
    public organizersAggregateStatisticsDataSource: OrganizersAggregateStatisticsDataSource,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private router: Router,
    public googleAnalyticsService: GoogleAnalyticsService
  ) {
  }

  private logger: HistorianService;

  organizersStatistics: OrganizersAggregateStatisticsSm;
  displayedColumns: string[] = ['name', 'internalMeetingCount',
    'internalMeetingSeconds', 'externalMeetingCount', 'externalMeetingSeconds'];
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  interval: IntervalSe;
  start: Moment;
  end: Moment;

  ngOnInit(): void {
    this.organizersAggregateStatisticsFacade.selectOrganizersAggregateStatisticsLoading().subscribe(loading => this.loading = loading);
    this.statisticsFiltersFacade.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.department = statisticsFilters.department;
      });
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
    this.organizersAggregateStatisticsDataSource.paginator = this.paginator;
    this.organizersAggregateStatisticsDataSource.sort = this.sort;
  }

  showMeetings(data): void {
    this.googleAnalyticsService.eventEmitter("view_organizer_meetings",
      "engagement", "view_organizer_meetings_action");
    this.statisticsFiltersFacade.dispatchSetOrganizer(data['organizerId']);
    this.statisticsFiltersFacade.selectOrganizer();
    this.router.navigateByUrl('/stats/meetings');
  }

}
