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
import { PersonSm } from '../../state/models/person-sm';
import { TeamMembersFacadeService } from '../../state/facades/team-members-facade.service';
import { TeamsService } from '../../services/teams.service';

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
      private teamMembersFacade: TeamMembersFacadeService,
      private teamsService: TeamsService
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

      this.meetingsListDataSource.loadMeetingList();

      this.meetingsListFacade.selectMeetingsListLoading().subscribe(loading => this.loading = loading);
      this.statisticsFiltersFacade.selectStatisticsFilters()
        .subscribe((statisticsFilters) => {
          this.interval = statisticsFilters.interval;
          this.start = statisticsFilters.start;
          this.end = statisticsFilters.end;
          this.organizer = statisticsFilters.organizer;
          this.meetingsListFacade.dispatchLoadMeetingsList();
        });

        this.teamMembersFacade.selectAttendee()
          .subscribe(teamsFilter => {
            if (teamsFilter) {
              this.attendee = teamsFilter;
            }
            this.meetingsListFacade.dispatchLoadMeetingsList();
          });

    }

    ngAfterViewInit(): void {
      this.meetingsListDataSource.paginator = this.paginator;
      this.meetingsListDataSource.sort = this.sort;

      if (this.organizer) {
        this.teamsService.getPerson(this.organizer).subscribe(val => {
          this.person = val;
        });
      }

      if (this.attendee) {
        this.teamsService.getPerson(this.attendee).subscribe(val => {
          this.person = val;
        });
      }

    }
}
