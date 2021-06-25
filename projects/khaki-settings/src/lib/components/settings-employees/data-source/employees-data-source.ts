import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HistorianService, Logging} from '@natr/historian';
import {map, tap} from 'rxjs/operators';
import { EmployeeDto, EmployeesResponseDto } from '../../../services/models/employeesResponseDto';
import { EmployeesFacadeService } from '../../../state/facades/employees-facade.service';
import { EmployeesTablePageableFacade } from '../../../state/employees-table-pageable/employees-table-pageable-facade.service';

@Logging
@Injectable()
export class EmployeesDataSource extends DataSource<EmployeeDto> {
  private logger: HistorianService;
  private pSort: MatSort;
  private pPaginator: MatPaginator;

  private handlePage = (pageEvent: PageEvent) => {
    this.logger.debug('pageEvent', pageEvent);
    this.employeesTablePageableFacade.dispatchSetEmployeesTablePageables(pageEvent.pageIndex, pageEvent.pageSize);
  };

  private handleSort = (sort: Sort) => {
    this.logger.debug('sort', sort);
    this.employeesTablePageableFacade
      .dispatchSetEmployeesTablePageables(
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

  private teamsSubject = new BehaviorSubject<EmployeeDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private employeesFacade: EmployeesFacadeService,
    private employeesTablePageableFacade: EmployeesTablePageableFacade
  ) {
    super();
  }

  connect(): Observable<EmployeeDto[]> {
    return this.employeesFacade.employees()
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

  employeeCount(): Observable<EmployeesResponseDto> {
    return this.employeesFacade.employees();
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
