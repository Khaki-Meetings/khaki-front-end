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

const routes: Routes = [
  {
    path: '',
    component: KhakiTeamsComponent,
    children: [
      {path: '', component: KhakiTeamsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    KhakiTeamsComponent,
    TeamComponent,
    IntervalTextDetailPipe
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
      EffectsModule.forFeature(
        [
          TeamMembersEffects,
          TeamMembersTablePageableEffects
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
  providers: [TeamMembersDataSource]
})

@Logging
export class KhakiTeamsModule {
  private logger: HistorianService;
  constructor(
    public teamMembersFacade: TeamMembersFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade) {
    this.logger.debug('teamMembersFacade', teamMembersFacade);
    this.logger.debug('statisticsFiltersFacade', statisticsFiltersFacade);
    teamMembersFacade.dispatchLoadTeamMembers();
    statisticsFiltersFacade.dispatchLoadSharedStatistics();
  }

}
