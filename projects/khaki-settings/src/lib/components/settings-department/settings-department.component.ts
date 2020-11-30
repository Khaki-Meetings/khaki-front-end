import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  data: string;
}

@Component({
  selector: 'lib-settings-department',
  templateUrl: './settings-department.component.html',
  styleUrls: ['./settings-department.component.scss']
})
export class SettingsDepartmentComponent implements OnInit {

  departments = [
    {
      name: 'Customer Service',
    },
    {
      name: 'Finance / Accounting Department',
    },
    {
      name: 'Human Resources / Personnel Department / Staff Department',
    },
    {
      name: 'I.T. (Information Technology)',
    },
    {
      name: 'Logistics',
    },
    {
      name: 'Maintenance',
    },
    {
      name: 'Marketing',
    },
    {
      name: 'Public Relations Team / Public Relations Department',
    },
    {
      name: 'Production Department / Manufacturing Department',
    },
    {
      name: 'Research and Development / Engineering Department',
    },
    {
      name: 'Sales',
    },
    {
      name: 'Shipping Department / Dispatch Department',
    },
    {
      name: 'Technical Support Team',
    }
  ]

  pos = 0
  maxshow = 9

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getDepartments() {
    return this.departments.slice(this.pos, this.pos + this.maxshow);
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialog, {
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
    if(newpos + this.maxshow <= this.departments.length) {
      this.pos = newpos;
    }
  }

  isLast() {    
    return this.pos + this.maxshow >= this.departments.length;
  }

  isFirst() {
    return this.pos == 0;
  }
}

@Component({
  selector: 'add-department-dialog',
  templateUrl: 'add-department-dialog.html',
  styleUrls: ['./add-department-dialog.scss']
})
export class AddDepartmentDialog {

  constructor(
    public dialogRef: MatDialogRef<AddDepartmentDialog>,
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