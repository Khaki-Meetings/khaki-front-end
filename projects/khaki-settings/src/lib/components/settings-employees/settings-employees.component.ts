import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeesFacadeService } from '../../state/facades/employees-facade.service';
import { EmployeeDto } from '../../services/models/employeesResponseDto';
export interface DialogData {
  data: string;
}

@Component({
  selector: 'lib-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent implements OnInit {

  employees: EmployeeDto[] = [];

  pos = 0;
  maxshow = 6;

  constructor(private router: Router, public dialog: MatDialog, private facadeServuce: EmployeesFacadeService) { }

  ngOnInit(): void {
    this.facadeServuce.requestEmployees();
    this.facadeServuce.employees()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(userProfile => {
        // this.logger.debug('onInit', userProfile);
        this.employees = userProfile.employees as EmployeeDto[];
      });
  }

  getEmployees(): EmployeeDto[] {
    return this.employees.slice(this.pos, this.pos + this.maxshow);
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
    if (newpos + this.maxshow <= this.employees.length) {
      this.pos = newpos;
    }
  }

  isLast(): boolean {
    return this.pos + this.maxshow >= this.employees.length;
  }

  isFirst(): boolean {
    return this.pos === 0;
  }
}

@Component({
  selector: 'lib-add-employee-dialog',
  templateUrl: 'add-employee-dialog.html',
  styleUrls: ['./add-employee-dialog.scss']
})
export class AddEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
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
