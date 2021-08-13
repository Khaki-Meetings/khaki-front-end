import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistorianService } from '@natr/historian';
import { DepartmentDto } from '../../services/models/departmentsResponseDto';
import { EmployeeDto } from '../../services/models/employeesResponseDto';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';

@Component({
  selector: 'lib-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
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

    this.settingsService.createEmployee(employeeDto)
      .subscribe(result => {
          this.logger.debug("createEmployee response: ", result);
      });

    this.dialogRef.close();
  }

}
