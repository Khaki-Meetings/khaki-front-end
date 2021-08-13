import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeesFacadeService} from '../../state/facades/employees-facade.service';
import {EmployeeDto} from '../../services/models/employeesResponseDto';
import {HistorianService, Logging} from '@natr/historian';
import {SettingsService} from '../../services/settings.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {mergeMap} from 'rxjs/operators';
import {TimeBlockSummaryResponseDto} from '../../services/models/time-block-summary-response-dto';
import {Moment} from 'moment/moment';
import { EmployeesDataSource } from './data-source/employees-data-source';
import { IntervalSe } from '../../state/models/interval-se';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

export interface DialogData {
  data: string;
}

@Logging
@Component({
  selector: 'lib-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private facadeService: EmployeesFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private settingsService: SettingsService,
    public employeesDataSource: EmployeesDataSource,
  ) {
  }

  private logger: HistorianService;
  interval: IntervalSe;
  start: Moment;
  end: Moment;

  dataLength: Number;

  loading = false;
  selectedEmployeeStats: TimeBlockSummaryResponseDto;

  employees: EmployeeDto[] = [];

  pos = 0;
  maxShow = 6;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['avatar',
    'firstName', 'lastName', 'department', 'email', 'actions'];

  ngOnInit(): void {
    this.facadeService.requestEmployees();

    this.facadeService.selectEmployeesLoading()
      .subscribe(loading => {
        this.logger.debug('onInit loading', loading);
        this.loading = loading
      });

    this.employeesDataSource.loadTeamMembers();

    this.employeesDataSource.employeeCount()
      .subscribe(members => {
        this.logger.debug('onInit count', members);
        this.dataLength = members.totalElements;
    });

    this.logger.debug('settings selectStatisticsFilters',
      this.statisticsFiltersFacade.selectStatisticsFilters());

    this.statisticsFiltersFacade
      .selectStatisticsFilters()
      .subscribe(
        statisticsFilters => {
          this.interval = statisticsFilters.interval;
          this.start = statisticsFilters.start;
          this.end = statisticsFilters.end;
        }
      );

  }

  ngAfterViewInit() {
    this.logger.debug('ngAfterViewInit');
    this.logger.debug('paginator is', this.paginator);
    this.employeesDataSource.paginator = this.paginator;
    this.employeesDataSource.sort = this.sort;
  }

  editEmployee(employee): void {
    this.router.navigateByUrl('settings/employee');
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: 'fit-content',
      data: {data: 'sample data'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  moveUp(): void {
    const newpos = this.pos - 1;
    if (newpos >= 0) {
      this.pos = newpos;
    }
  }

  moveDown(): void {
    const newpos = this.pos + 1;
    if (newpos + this.maxShow <= this.employees.length) {
      this.pos = newpos;
    }
  }

  isLast(): boolean {
    return this.pos + this.maxShow >= this.employees.length;
  }

  isFirst(): boolean {
    return this.pos === 0;
  }

  panelOpen(employee: EmployeeDto): void {
    this.logger.debug('open', employee);
    this.loading = true;
    this.settingsService
      .getEmployeeStats(employee.id, this.start, this.end)
      .subscribe(
        timeBlockSummary => {
          this.loading = false;
          this.selectedEmployeeStats = timeBlockSummary;
        }
      );
  }

  openDialogEdit(row) {
    console.log("row" + row.id);

    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
        data: {
          id: row.id,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          department: row.department
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // This will force a refresh on the table. Kinda hacky but effective.
        this.paginator._changePageSize(this.paginator.pageSize);
      });
  }


  openDialogAdd() {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
        data: {
          firstName: '',
          lastName: '',
          email: '',
          department: ''
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // This will force a refresh on the table. Kinda hacky but effective.
        this.paginator._changePageSize(this.paginator.pageSize);
      });
  }

}
/*
@Logging
@Component({
  selector: 'lib-add-employee-dialog',
  templateUrl: 'add-employee-dialog.html',
  styleUrls: ['./add-employee-dialog.scss']
})
export class AddEmployeeDialogComponent {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  showError = false;
  fileSelected = false;

  fileName: string;
  file: File;

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNextClick(): void {
    this.showError = true;
  }

  onUploadClick(): void {
    this.dialogRef.close();
  }

  onAdd(event): void {
    this.logger.debug('fileInput changed', event);
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.logger.debug('file', this.file);
      this.showError = false;
      this.fileSelected = true;
    }
  }

  onRemove(): void {
    this.fileName = '';
    this.file = null;
    this.fileSelected = false;
  }


}*/
