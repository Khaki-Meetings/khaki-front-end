import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';
import { DepartmentDto } from '../../services/models/departmentsResponseDto';
export interface DialogData {
  data: string;
}

@Component({
  selector: 'lib-settings-department',
  templateUrl: './settings-department.component.html',
  styleUrls: ['./settings-department.component.scss']
})
export class SettingsDepartmentComponent implements OnInit {

  departments: DepartmentDto[] = [];

  pos = 0;
  maxshow = 9;

  constructor(private router: Router, public dialog: MatDialog, private departmentsFacadeService: DepartmentsFacadeService) { }

  ngOnInit(): void {
    this.departmentsFacadeService.requestDepartments();
    this.departmentsFacadeService.departments()
      .subscribe(data => {
        this.departments = data.departments as DepartmentDto[];
      });
  }

  getDepartments(): DepartmentDto[] {
    return this.departments.slice(this.pos, this.pos + this.maxshow);
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
    if (newpos + this.maxshow <= this.departments.length) {
      this.pos = newpos;
    }
  }

  isLast(): boolean {
    return this.pos + this.maxshow >= this.departments.length;
  }

  isFirst(): boolean {
    return this.pos === 0;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
