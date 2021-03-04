import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {OrganizersStatisticsDataSource} from './data-source/organizers-statistics-data-source';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {MatSort} from '@angular/material/sort';
import {OrganizersTablePageableFacade} from '../../state/organizers-table-pageable/organizers-table-pageable-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import { Router } from '@angular/router';

@Logging
@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})

export class OrganizersTableComponent implements OnInit, AfterViewInit {
  constructor(
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    public organizersStatisticsDataSource: OrganizersStatisticsDataSource,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private router: Router
  ) {
  }

  private logger: HistorianService;

  organizersStatistics: OrganizersStatisticsSm;
  displayedColumns: string[] = ['name', 'meeting', 'hours'];
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  interval: IntervalSe;
  start: Moment;
  end: Moment;

  ngOnInit(): void {
    this.organizersStatisticsFacade.selectOrganizersStatisticsLoading().subscribe(loading => this.loading = loading);
    this.statisticsFiltersFacade.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
      });
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
    this.organizersStatisticsDataSource.paginator = this.paginator;
    this.organizersStatisticsDataSource.sort = this.sort;
  }

  showMeetings(data): void {
    this.statisticsFiltersFacade.dispatchSetOrganizer(data['organizerId']);
    this.statisticsFiltersFacade.selectOrganizer();
    this.router.navigateByUrl('/stats/meetings');
  }

}
