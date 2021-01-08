import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {OrganizerStatisticsSm} from '../../state/models/organizer-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {StatisticsFiltersFacadeService} from '../../state/facades/statistics-filters-facade.service';
import {StatisticsFiltersSm} from '../../state/reducers/statistics-filters.reducer';
import {Utilities} from '../../services/utilities';
import {OrganizersTablePageableFacade} from '../../state/organizers-table-pageable/organizers-table-pageable-facade.service';

@Logging
@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})

export class OrganizersTableComponent implements OnInit, AfterViewInit {
  private logger: HistorianService;
  organizersStatistics: OrganizersStatisticsSm;
  displayedColumns: string[] = ['name', 'meeting', 'hours'];

  dataSource: OrganizerStatisticsSm[] = [];

  intervalText: string;
  meetingTypeText: string;

  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    private statisticsFiltersFacadeService: StatisticsFiltersFacadeService,
    private organizersTablePageableFacade: OrganizersTablePageableFacade
  ) {
  }

  ngOnInit(): void {
    this.organizersStatisticsFacade.organizersStatistics()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(organizersStatistics => {
        this.logger.debug('onInit organizersStatistics', organizersStatistics);
        this.organizersStatistics = organizersStatistics;
        this.dataSource = organizersStatistics.content;
        if (this.paginator) {
          this.paginator.length = organizersStatistics.totalElements;
          this.paginator.pageSize = organizersStatistics.size;
        }
      });

    this.statisticsFiltersFacadeService.statisticsFilters()
      .subscribe((data) => {
        const statsFilter = data as StatisticsFiltersSm;
        const timeBlockRange = {start: statsFilter.start, end: statsFilter.end};
        this.intervalText =
          Utilities.formatIntervalTextDetail(IntervalEnum[statsFilter.interval], timeBlockRange);
        this.meetingTypeText = Utilities.formatMeetingTypeDetail(statsFilter.filter);
      });

    this.organizersStatisticsFacade.organizersStatisticsLoading().subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
  }

  pageChange(event: PageEvent): void {
    this.logger.debug('page change event', event);
    this.organizersTablePageableFacade.setPageable(event.pageIndex, event.pageSize);
  }
}
