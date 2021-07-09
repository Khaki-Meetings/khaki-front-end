import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {HistorianService, Logging } from '@natr/historian';
import {MatPaginator } from '@angular/material/paginator';
import {MeetingsListSm} from '../../state/models/meetings-list-sm';
import {MatSort} from '@angular/material/sort';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {MeetingsListFacadeService} from '../../state/facades/meetings-list-facade.service';
import {MeetingsListDataSource} from './data-source/meetings-list-data-source';
import { StatisticsService } from '../../services/statistics.service';
import { PersonSm } from '../../state/models/person-sm';

@Logging
@Component({
  selector: 'lib-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnInit, AfterViewInit {

    constructor(
      private meetingsListFacade: MeetingsListFacadeService,
      public meetingsListDataSource: MeetingsListDataSource,
      private statisticsFiltersFacade: StatisticsFiltersFacade,
      private statisticsService: StatisticsService
    ) {
    }

    private logger: HistorianService;

    meetingList: MeetingsListSm;
    displayedColumns: string[] = ['start', 'totalSeconds', 'summary', 'numberTotalAttendees'];
    loading = false;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    interval: IntervalSe;
    start: Moment;
    end: Moment;
    organizer: string;
    attendee: string;
    person: PersonSm;

    ngOnInit(): void {
      this.meetingsListFacade.selectMeetingsListLoading().subscribe(loading => this.loading = loading);
      this.statisticsFiltersFacade.selectStatisticsFilters()
        .subscribe((statisticsFilters) => {
          this.interval = statisticsFilters.interval;
          this.start = statisticsFilters.start;
          this.end = statisticsFilters.end;
          this.organizer = statisticsFilters.organizer;
          this.attendee = statisticsFilters.attendee;
        });

    }

    ngAfterViewInit(): void {
      this.logger.debug('paginator is', this.paginator);
      this.meetingsListDataSource.paginator = this.paginator;
      this.meetingsListDataSource.sort = this.sort;

      if (this.organizer) {
        this.statisticsService.getPerson(this.organizer).subscribe(val => {
          this.person = val;
        });
      }

      if (this.attendee) {
        this.statisticsService.getPerson(this.attendee).subscribe(val => {
          this.person = val;
        });
      }
    }
}
