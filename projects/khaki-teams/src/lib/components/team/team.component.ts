import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IntervalSe } from '../../state/statistics-filters/interval-se.enum';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Moment } from 'moment';
import { TeamMembersDataSource } from './data-source/team-members-data-source';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { StatisticsFiltersFacade } from '@khaki/statistics';
import { TeamMembersFacadeService } from '../../state/facades/team-members-facade.service';
import { HistorianService, Logging } from '@natr/historian';
import { map, tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewChecked } from '@angular/core';

@Logging
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit {

  department: string;
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  interval: IntervalSe;
  start: Moment;
  end: Moment;

  dataLength: Number;

  private logger: HistorianService;

  displayedColumns: string[] = ['avatar', 'firstName', 'lastName',
    'email', 'department'];

  constructor(
    public teamMembersDataSource: TeamMembersDataSource,
    private teamMembersFacade: TeamMembersFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade) {
  }

  ngOnInit(): void {

    this.teamMembersDataSource.loadTeamMembers();

    this.logger.debug('ngOnInit');
    this.teamMembersFacade.selectTeamMembersLoading()
      .subscribe(loading => {
        this.logger.debug('onInit loading', loading);
        this.loading = loading
      });

    this.teamMembersDataSource.teamMemberCount()
    .subscribe(loading => {
      this.logger.debug('onInit loading', loading);
      this.dataLength = loading.totalElements;
    });

      /*
    this.logger.debug('statisticsFiltersFacade', this.statisticsFiltersFacade);
    this.logger.debug('selectStatisticsFilters',
      this.statisticsFiltersFacade.selectStatisticsFilters());

    this.statisticsFiltersFacade.selectStatisticsFilters()
      .subscribe(statisticsFilters => {
        this.logger.debug('onInit', statisticsFilters);
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.department = statisticsFilters.department;
      });
      */
  }

  ngAfterViewInit() {
    this.logger.debug('ngAfterViewInit');
    this.logger.debug('paginator is', this.paginator);
    this.teamMembersDataSource.paginator = this.paginator;
    this.teamMembersDataSource.sort = this.sort;
  }

}
