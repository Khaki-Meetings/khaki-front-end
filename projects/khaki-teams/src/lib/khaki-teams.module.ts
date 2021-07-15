import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TeamComponent } from './components/team/team.component';
import { KhakiTeamsComponent } from './khaki-teams.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TeamMembersDataSource } from './components/team/data-source/team-members-data-source';
import {IntervalTextDetailPipe} from './pipes/interval-text-detail.pipe';
import { HistorianService, Logging } from '@natr/historian';
import { EffectsModule } from '@ngrx/effects';
import { TeamMembersEffects } from './state/effects/team-members.effects';
import { TeamMembersFacadeService } from './state/facades/team-members-facade.service';
import { StoreModule } from '@ngrx/store';
import * as fromKhakiTeams from './state';
import { MatSortModule } from '@angular/material/sort';
import { TeamMembersTablePageableEffects } from './state/team-members-table-pageable/team-members-table-pageable.effects';
import { StatisticsFiltersFacade } from './state/statistics-filters/statistics-filters-facade'
import { KhakiTeamsRoutingModule } from './khaki-teams-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';
import { KhakiCommonModule } from 'khaki-common';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { MeetingsListDataSource } from './components/meetings-list/data-source/meetings-list-data-source';
import { MeetingsListEffects } from './state/effects/meetings-list.effects';
import { MeetingsTablePageableEffects } from './state/meetings-table-pageable/meetings-table-pageable.effects';
import { MeetingsListFacadeService } from './state/facades/meetings-list-facade.service';
import { MeetingStartDatePipe } from './pipes/meeting-start-date.pipe';
import { MeetingStartEndTimesPipe } from './pipes/meeting-start-end-times.pipe';

const routes: Routes = [
  {
    path: '',
    component: KhakiTeamsComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [
    KhakiTeamsComponent,
    MeetingsListComponent,
    TeamComponent,
    IntervalTextDetailPipe,
    HoursMinutesPipe,
    MeetingStartDatePipe,
    MeetingStartEndTimesPipe
  ],
  imports: [
      KhakiTeamsRoutingModule,
  //    RouterModule.forChild(routes),
      MatIconModule,
      CommonModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      KhakiCommonModule,
      EffectsModule.forFeature(
        [
          TeamMembersEffects,
          TeamMembersTablePageableEffects,
          MeetingsListEffects,
          MeetingsTablePageableEffects
        ]
      ),
      StoreModule.forFeature(
        fromKhakiTeams.teamsFeatureKey,
        fromKhakiTeams.reducers,
        {
          metaReducers: fromKhakiTeams.metaReducers
        }
      ),
  ],
  exports: [KhakiTeamsComponent],
  providers: [TeamMembersDataSource, MeetingsListDataSource]
})

@Logging
export class KhakiTeamsModule {
  private logger: HistorianService;
  constructor(
    public teamMembersFacade: TeamMembersFacadeService,
    public meetingsListFacade: MeetingsListFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade) {
    this.logger.debug('teamMembersFacade', teamMembersFacade);
    this.logger.debug('statisticsFiltersFacade', statisticsFiltersFacade);
    teamMembersFacade.dispatchLoadTeamMembers();
    meetingsListFacade.dispatchLoadMeetingsList();
    statisticsFiltersFacade.dispatchLoadSharedStatistics();
  }

}
