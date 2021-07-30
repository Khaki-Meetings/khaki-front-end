import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HistorianService, Logging} from '@natr/historian';
import {map, tap} from 'rxjs/operators';
import { DepartmentDto, DepartmentsResponsePageableDto } from '../../../services/models/departmentsResponseDto';
import { DepartmentsFacadeService } from '../../../state/facades/departments-facade.service';
import { DepartmentsTablePageableFacade } from '../../../state/departments-table-pageable/departments-table-pageable-facade.service';

@Logging
@Injectable()
export class DepartmentsDataSource extends DataSource<DepartmentDto> {
  private logger: HistorianService;
  private pSort: MatSort;
  private pPaginator: MatPaginator;

  private handlePage = (pageEvent: PageEvent) => {
    this.logger.debug('pageEvent', pageEvent);
    this.departmentsTablePageableFacade.dispatchSetDepartmentsTablePageables(pageEvent.pageIndex, pageEvent.pageSize);
  };

  private handleSort = (sort: Sort) => {
    this.logger.debug('DepartmentsDataSource sort', sort);
    this.departmentsTablePageableFacade
      .dispatchSetDepartmentsTablePageables(
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
    this.logger.debug("sort departments");
    this.pSort = value;
    this.pSort.sortChange.subscribe(this.handleSort);
  }

  private departmentsSubject = new BehaviorSubject<DepartmentDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private departmentsFacade: DepartmentsFacadeService,
    private departmentsTablePageableFacade: DepartmentsTablePageableFacade
  ) {
    super();
  }

  connect(): Observable<DepartmentDto[]> {
    return this.departmentsFacade.departmentsPageable()
      .pipe(
        tap(departments => {
          if (this.pPaginator) {
            this.pPaginator.length = departments.totalElements;
            this.pPaginator.pageSize = departments.size;
          }
        }),
        map(departments => departments.content)
      );
  }

  departmentsCount(): Observable<DepartmentsResponsePageableDto> {
    this.logger.debug("departmentsCount()", this.departmentsFacade.departmentsPageable())
    return this.departmentsFacade.departmentsPageable();
  }

  disconnect(): void {
    this.departmentsSubject.complete();
    this.loadingSubject.complete();
  }

  loadDepartments(filter = '',
            sortDirection = 'asc', pageIndex = 0, pageSize = 5) {
    this.loadingSubject.next(true);
  }

}
