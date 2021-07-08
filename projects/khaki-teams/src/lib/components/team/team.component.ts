import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IntervalSe } from '../../state/statistics-filters/interval-se.enum';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Moment } from 'moment';
import { TeamMembersDataSource } from './data-source/team-members-data-source';
import { MatSort } from '@angular/material/sort';
import { StatisticsFiltersFacade } from '@khaki/statistics';
import { TeamMembersFacadeService } from '../../state/facades/team-members-facade.service';
import { HistorianService, Logging } from '@natr/historian';
import { map, tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { StatisticsScopeSe } from '../../state/statistics-filters/statistics-scope-se.enum';
import { Router } from '@angular/router';

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
    'department', 'totalMeetings', 'totalSeconds'];

  private defaultTimeInterval = IntervalSe.Week;

  private defaultStatisticsFilters = {
    statisticsScope: StatisticsScopeSe.Internal,
    interval: IntervalSe.Week
  }

  constructor(
    public teamMembersDataSource: TeamMembersDataSource,
    private teamMembersFacade: TeamMembersFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private router: Router) {
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
    .subscribe(members => {
      this.logger.debug('onInit count', members);
      this.dataLength = members.totalElements;
    });

    this.interval = this.defaultStatisticsFilters.interval;

    this.logger.debug('statisticsFiltersFacade', this.statisticsFiltersFacade);
    this.logger.debug('ngOnInit selectStatisticsFilters',
      this.statisticsFiltersFacade.selectStatisticsFilters());

    this.statisticsFiltersFacade.selectStatisticsFilters()
      .subscribe(statisticsFilters => {
        this.logger.debug('onInit', statisticsFilters);
        this.interval = statisticsFilters.interval || IntervalSe.Week;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.department = statisticsFilters.department || "";
        this.logger.debug("DEPARTMENT: " + this.department);
        this.teamMembersFacade.dispatchLoadTeamMembers();
      });
  }

  ngAfterViewInit() {
    this.logger.debug('ngAfterViewInit');
    this.logger.debug('paginator is', this.paginator);
    this.teamMembersDataSource.paginator = this.paginator;
    this.teamMembersDataSource.sort = this.sort;
  }

  showMeetings(data): void {

    this.logger.debug('Data', data);

    this.statisticsFiltersFacade.dispatchSetOrganizer(data['id']);
    this.statisticsFiltersFacade.selectOrganizer();

    this.router.navigateByUrl('/stats/meetings');
  }

}
