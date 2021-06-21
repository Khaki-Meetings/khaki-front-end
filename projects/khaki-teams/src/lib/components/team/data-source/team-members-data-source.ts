import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {TeamMemberSm} from '../../../state/models/team-member-sm';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {TeamMembersFacadeService} from '../../../state/facades/team-members-facade.service';
import {StatisticsFiltersFacade} from '../../../state/statistics-filters/statistics-filters-facade';
import {TeamMembersTablePageableFacade} from '../../../state/team-members-table-pageable/team-members-table-pageable-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {map, tap} from 'rxjs/operators';
import { TeamMembersSm } from '../../../state/models/team-members-sm';

@Logging
@Injectable()
export class TeamMembersDataSource extends DataSource<TeamMemberSm> {
  private logger: HistorianService;
  private pSort: MatSort;
  private pPaginator: MatPaginator;

  private handlePage = (pageEvent: PageEvent) => {
    this.logger.debug('pageEvent', pageEvent);
    this.teamMembersTablePageableFacade.dispatchSetTeamMembersTablePageables(pageEvent.pageIndex, pageEvent.pageSize);
  };

  private handleSort = (sort: Sort) => {
    this.logger.debug('sort', sort);
    this.teamMembersTablePageableFacade
      .dispatchSetTeamMembersTablePageables(
        this.pPaginator.pageIndex,
        this.pPaginator.pageSize,
        sort.active,
        sort.direction
      );
  };

  set paginator(value: MatPaginator) {
    this.logger.debug("Setting paginator ", value);
    this.pPaginator = value;
    this.pPaginator.page.subscribe(this.handlePage);
  }

  set sort(value: MatSort) {
    this.pSort = value;
    this.pSort.sortChange.subscribe(this.handleSort);
  }

  private teamsSubject = new BehaviorSubject<TeamMemberSm[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private teamMembersFacade: TeamMembersFacadeService,
    private teamMembersTablePageableFacade: TeamMembersTablePageableFacade
  ) {
    super();
  }

  connect(): Observable<TeamMemberSm[]> {
    return this.teamMembersFacade.selectTeamMembers()
      .pipe(
        tap(teamMembers => {
          console.log("teamMembers: " + JSON.stringify(teamMembers));
          console.log("teamMembers: " + teamMembers.totalElements);
          console.log("teamMembers: " + teamMembers.size);
          console.log("teamMembers: " + this.pPaginator);

          if (this.pPaginator) {
            this.pPaginator.length = teamMembers.totalElements;
            this.pPaginator.pageSize = teamMembers.size;
          }
        }),
        map(teamMembers => teamMembers.content)
      );
  }

  teamMemberCount(): Observable<TeamMembersSm> {
    return this.teamMembersFacade.selectTeamMembers();
  }

  disconnect(): void {
    this.teamsSubject.complete();
    this.loadingSubject.complete();
  }

  loadTeamMembers(filter = '',
            sortDirection = 'asc', pageIndex = 0, pageSize = 5) {
    this.loadingSubject.next(true);
  }

}
