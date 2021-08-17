import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HistorianService, Logging } from '@natr/historian';
import { DepartmentDto } from '../../services/models/departmentsResponseDto';
import { EmployeeDto } from '../../services/models/employeesResponseDto';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';

@Logging
@Component({
  selector: 'lib-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent { //} implements OnInit {

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
    { id: string, firstName: string, lastName: string, department: string,
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
    const employeeDto = this.data as EmployeeDto;

    this.settingsService.updateEmployee(this.data.id, employeeDto)
      .subscribe(result => {
          this.logger.debug("updateEmployee response: ", result);
      });

    this.dialogRef.close();
  }

}
