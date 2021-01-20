import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeesFacadeService} from '../../state/facades/employees-facade.service';
import {EmployeeDto} from '../../services/models/employeesResponseDto';
import {HistorianService, Logging} from '@natr/historian';
import {SettingsService} from '../../services/settings.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {mergeMap} from 'rxjs/operators';
import {TimeBlockSummaryResponseDto} from '../../services/models/time-block-summary-response-dto';

export interface DialogData {
  data: string;
}

@Logging
@Component({
  selector: 'lib-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private facadeService: EmployeesFacadeService,
    private statisticsFiltersFacade: StatisticsFiltersFacade,
    private settingsService: SettingsService
  ) {
  }

  private logger: HistorianService;
  interval;
  statisticsScope;
  employeeStatsLoading = true;
  selectedEmployeeStats: TimeBlockSummaryResponseDto;

  employees: EmployeeDto[] = [];

  pos = 0;
  maxShow = 6;


  ngOnInit(): void {
    this.facadeService.requestEmployees();

    this.settingsService
      .getEmployees()
      .subscribe(data => {
        this.employees = data['content'] as EmployeeDto[];
      });

    this.statisticsFiltersFacade
      .selectStatisticsFilters()
      .subscribe(
        statisticsFilters => {
          this.interval = statisticsFilters.interval;
          this.statisticsScope = statisticsFilters.statisticsScope;
        }
      );

  }

  getEmployees(): EmployeeDto[] {
    return this.employees.slice(this.pos, this.pos + this.maxShow);
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
      // this.animal = result;
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
    this.employeeStatsLoading = true;
    this.statisticsFiltersFacade
      .selectStatisticsFilters()
      .pipe(
        mergeMap(
          statisticsFilters => this.settingsService
            .getEmployeeStats(employee.id, statisticsFilters.start, statisticsFilters.end)
        )
      )
      .subscribe(
        timeBlockSummary => {
          this.employeeStatsLoading = false;
          this.selectedEmployeeStats = timeBlockSummary;
        }
      );
  }

}

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


}
