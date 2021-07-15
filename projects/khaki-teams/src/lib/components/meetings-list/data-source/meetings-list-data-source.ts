import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MeetingListSm} from '../../../state/models/meeting-list-sm';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MeetingsListFacadeService} from '../../../state/facades/meetings-list-facade.service';
import {StatisticsFiltersFacade} from '../../../state/statistics-filters/statistics-filters-facade';
import {MeetingsTablePageableFacade} from '../../../state/meetings-table-pageable/meetings-table-pageable-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {map, tap} from 'rxjs/operators';

@Logging
@Injectable()
export class MeetingsListDataSource extends DataSource<MeetingListSm> {
  private logger: HistorianService;
  private pSort: MatSort;
  private pPaginator: MatPaginator;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private handlePage = (pageEvent: PageEvent) => {
    this.meetingsTablePageableFacade.dispatchSetMeetingsTablePageables(pageEvent.pageIndex, pageEvent.pageSize);
  };

  private handleSort = (sort: Sort) => {
    this.meetingsTablePageableFacade
      .dispatchSetMeetingsTablePageables(
        this.pPaginator.pageIndex,
        this.pPaginator.pageSize,
        sort.active,
        sort.direction
      );
  };

  set paginator(value: MatPaginator) {
    this.pPaginator = value;
    this.pPaginator.page.subscribe(this.handlePage);
  }

  set sort(value: MatSort) {
    this.pSort = value;
    this.pSort.sortChange.subscribe(this.handleSort);
  }

  constructor(
    private meetingsListFacadeService: MeetingsListFacadeService,
    private statisticsFiltersFacadeService: StatisticsFiltersFacade,
    private meetingsTablePageableFacade: MeetingsTablePageableFacade
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ReadonlyArray<MeetingListSm>> {
    return this.meetingsListFacadeService.selectMeetingsList()
      .pipe(
        tap(meetingsList => {
          if (this.pPaginator) {
            this.pPaginator.length = meetingsList.totalElements;
            this.pPaginator.pageSize = meetingsList.size;
          }
        }),
        map(meetingsList => meetingsList.content)
      );
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  loadMeetingList(filter = '',
            sortDirection = 'asc', pageIndex = 0, pageSize = 5) {
    this.loadingSubject.next(true);
  }
}
