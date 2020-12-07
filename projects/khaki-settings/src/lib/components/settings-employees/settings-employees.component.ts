import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeesFacadeService } from '../../state/facades/employees-facade.service';
export interface DialogData {
  data: string;
}

@Component({
  selector: 'lib-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent implements OnInit {

  employees = [];

  pos = 0
  maxshow = 6

  constructor(private router: Router, public dialog: MatDialog, private facadeServuce: EmployeesFacadeService) { }

  ngOnInit(): void {
    this.facadeServuce.requestEmployees();
    this.facadeServuce.employees()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(userProfile => {
        //this.logger.debug('onInit', userProfile);
        this.employees = userProfile.employees;
      });
  }

  getEmployees() {
    return this.employees.slice(this.pos, this.pos + this.maxshow);
  }

  editEmployee(employee) {
    this.router.navigateByUrl("settings/employee");
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: 'fit-content',
      data: {data: "sample data"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  moveUp() { 
    let newpos = this.pos - 1;    
    if(newpos>=0) {
      this.pos = newpos;
    }
  }

  moveDown() {   
    let newpos = this.pos + 1;    
    if(newpos + this.maxshow <= this.employees.length) {
      this.pos = newpos;
    }
  }

  isLast() {    
    return this.pos + this.maxshow >= this.employees.length;
  }

  isFirst() {
    return this.pos == 0;
  }
}

@Component({
  selector: 'add-employee-dialog',
  templateUrl: 'add-employee-dialog.html',
  styleUrls: ['./add-employee-dialog.scss']
})
export class AddEmployeeDialog {

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNextClick(): void {
    this.show_error = true;
  }

  onUploadClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.show_error = false;
    this.file_selected = true;
  }

  onRemove(): void {
    this.file_selected = false;
  }

  show_error = false;
  file_selected = false;

}