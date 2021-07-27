import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HistorianService, Logging } from '@natr/historian';
import { DepartmentDto } from '../../services/models/departmentsResponseDto';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';

@Logging
@Component({
  selector: 'lib-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent { //} implements OnInit {

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
    { id: number, firstName: string, lastName: string, department: string,
      email: string },
      private departmentsFacadeService: DepartmentsFacadeService,
      private settingsService: SettingsService) {  }

  departments: DepartmentDto[];

  ngOnInit(): void {
    this.departmentsFacadeService.requestDepartments();

    this.settingsService
      .getDepartments()
      .subscribe(data => {
        this.departments = data['content'] as DepartmentDto[];
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.logger.debug("Updated data: ", this.data);
    this.dialogRef.close();
  }

}
