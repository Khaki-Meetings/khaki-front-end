import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DepartmentsFacadeService} from '../../state/facades/departments-facade.service';
import {DepartmentDto} from '../../services/models/departmentsResponseDto';
import {SettingsService} from '../../services/settings.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistorianService, Logging } from '@natr/historian';
import { DepartmentsDataSource } from './data-source/departments-data-source';
import { StatisticsFiltersFacade } from '@khaki/statistics';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';

export interface DialogData {
  data: string;
}

@Logging
@Component({
  selector: 'lib-settings-department',
  templateUrl: './settings-department.component.html',
  styleUrls: ['./settings-department.component.scss']
})
export class SettingsDepartmentComponent implements OnInit {

  departments: DepartmentDto[] = [];

  pos = 0;
  maxShow = 9;

  private logger: HistorianService;
  loading = false;
  dataLength: Number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(private router: Router, public dialog: MatDialog,
              private departmentsFacadeService: DepartmentsFacadeService,
              private settingsService: SettingsService,
              private statisticsFiltersFacade: StatisticsFiltersFacade,
              public departmentsDataSource: DepartmentsDataSource) {
  }

  ngOnInit(): void {
    this.departmentsFacadeService.requestDepartments();

      this.departmentsFacadeService.requestDepartmentsPageable();

      this.departmentsFacadeService.selectDepartmentsPageableLoading()
        .subscribe(loading => {
          this.logger.debug('onInit loading', loading);
          this.loading = loading
        });

      this.departmentsDataSource.loadDepartments();

      this.departmentsDataSource.departmentsCount()
        .subscribe(members => {
          this.logger.debug('departmentsDataSource onInit count', members);
          this.dataLength = members.totalElements;
      });

      this.settingsService
        .getDepartments()
        .subscribe(data => {
          this.departments = data['content'] as DepartmentDto[];
        });

  }

  ngAfterViewInit() {
    this.logger.debug('ngAfterViewInit');
    this.logger.debug('paginator is', this.paginator);
    this.departmentsDataSource.paginator = this.paginator;
    this.departmentsDataSource.sort = this.sort;
  }

  getDepartments(): DepartmentDto[] {
    return this.departments.slice(this.pos, this.pos + this.maxShow);
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
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
    if (newpos + this.maxShow <= this.departments.length) {
      this.pos = newpos;
    }
  }

  isLast(): boolean {
    return this.pos + this.maxShow >= this.departments.length;
  }

  isFirst(): boolean {
    return this.pos === 0;
  }

  openDialogAdd() {

    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
        data: {
          name: ''
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // This will force a refresh on the table. Kinda hacky but effective.
        this.paginator._changePageSize(this.paginator.pageSize);
      });
  }

  openDialogEdit(row) {
    console.log("row" + row.id);

    const dialogRef = this.dialog.open(EditTeamDialogComponent, {
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
}

@Component({
  selector: 'lib-add-department-dialog',
  templateUrl: 'add-department-dialog.html',
  styleUrls: ['./add-department-dialog.scss']
})
export class AddDepartmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  showError = false;
  fileSelected = false;

  onNextClick(): void {
    this.showError = true;
  }

  onUploadClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.showError = false;
    this.fileSelected = true;
  }

  onRemove(): void {
    this.fileSelected = false;
  }

}
