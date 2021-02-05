import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {OrganizerStatisticsSm} from '../../../state/models/organizer-statistics-sm';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {OrganizersStatisticsFacadeService} from '../../../state/facades/organizers-statistics-facade.service';
import {StatisticsFiltersFacade} from '../../../state/statistics-filters/statistics-filters-facade';
import {OrganizersTablePageableFacade} from '../../../state/organizers-table-pageable/organizers-table-pageable-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {map, tap} from 'rxjs/operators';

@Logging
@Injectable()
export class OrganizersStatisticsDataSource extends DataSource<OrganizerStatisticsSm> {
  private logger: HistorianService;
  private pSort: MatSort;
  private pPaginator: MatPaginator;

  private handlePage = (pageEvent: PageEvent) => {
    this.logger.debug('pageEvent', pageEvent);
    this.organizersTablePageableFacade.dispatchSetOrganizersTablePageables(pageEvent.pageIndex, pageEvent.pageSize);
  };

  private handleSort = (sort: Sort) => {
    this.logger.debug('sort', sort);
    this.organizersTablePageableFacade
      .dispatchSetOrganizersTablePageables(
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
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    private statisticsFiltersFacadeService: StatisticsFiltersFacade,
    private organizersTablePageableFacade: OrganizersTablePageableFacade
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ReadonlyArray<OrganizerStatisticsSm>> {
    return this.organizersStatisticsFacade.selectOrganizersStatistics()
      .pipe(
        tap(organizersStatistics => {
          if (this.pPaginator) {
            this.pPaginator.length = organizersStatistics.totalElements;
            this.pPaginator.pageSize = organizersStatistics.size;
          }
        }),
        map(organizersStatistics => organizersStatistics.content)
      );
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
