import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {OrganizerStatisticsSm} from '../../state/models/organizer-statistics-sm';
import {OrganizersTablePageableFacade} from '../../state/organizers-table-pageable/organizers-table-pageable-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  // dataSource: MatTableDataSource<OrganizerStatisticsSm>; // OrganizerStatisticsSm[] = [];
  dataSource: OrganizerStatisticsSm[] = [];
  interval: IntervalSe;
  start: Moment;
  end: Moment;
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    private statisticsFiltersFacadeService: StatisticsFiltersFacade,
    private organizersTablePageableFacade: OrganizersTablePageableFacade
  ) {
  }

  ngOnInit(): void {
    // this.organizersStatisticsFacade.organizersStatistics()
    //   .subscribe(organizersStatistics => {
    //     this.logger.debug('onInit organizersStatistics', organizersStatistics);
    //     this.organizersStatistics = organizersStatistics;
    //     this.dataSource = new MatTableDataSource<OrganizerStatisticsSm>(organizersStatistics.content);
    //     this.dataSource.sort = this.sort;
    //
    //     if (this.paginator) {
    //       this.paginator.length = organizersStatistics.totalElements;
    //       this.paginator.pageSize = organizersStatistics.size;
    //     }
    //   });
    //
    // this.statisticsFiltersFacadeService.selectStatisticsFilters()
    //   .subscribe((statisticsFilters) => {
    //     this.interval = statisticsFilters.interval;
    //     this.start = statisticsFilters.start;
    //     this.end = statisticsFilters.end;
    //   });
    //
    // this.organizersStatisticsFacade.organizersStatisticsLoading().subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
  }

  pageChange(event: PageEvent): void {
    this.logger.debug('page change event', event);
    this.organizersTablePageableFacade.setPageable(event.pageIndex, event.pageSize);
  }
}
