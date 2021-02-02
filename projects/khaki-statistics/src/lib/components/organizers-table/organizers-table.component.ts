import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {OrganizersStatisticsDataSource} from './data-source/organizers-statistics-data-source';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {MatSort} from '@angular/material/sort';

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
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    // private statisticsFiltersFacadeService: StatisticsFiltersFacade,
    // private organizersTablePageableFacade: OrganizersTablePageableFacade
    public organizersStatisticsDataSource: OrganizersStatisticsDataSource
  ) {
  }

  ngOnInit(): void {
    // this.organizersStatisticsFacade.organizersStatistics()
    //   .subscribe(organizersStatistics => {
    //     this.logger.debug('onInit organizersStatistics', organizersStatistics);
    //     this.organizersStatistics = organizersStatistics;
    //     this.dataSource = organizersStatistics.content;
    //
    //     if (this.paginator) {
    //       this.paginator.length = organizersStatistics.totalElements;
    //       this.paginator.pageSize = organizersStatistics.size;
    //     }
    //   });
    //
    this.organizersStatisticsFacade.selectOrganizersStatisticsLoading().subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
    this.organizersStatisticsDataSource.paginator = this.paginator;
    this.organizersStatisticsDataSource.sort = this.sort;
  }
}
