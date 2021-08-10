import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistorianService } from '@natr/historian';
import { DepartmentDto } from '../../services/models/departmentsResponseDto';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';

@Component({
  selector: 'lib-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTeamDialogComponent implements OnInit {

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<EditTeamDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:
      { id: string, name: string },
        private departmentsFacadeService: DepartmentsFacadeService,
        private settingsService: SettingsService) {  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const departmentDto = this.data as DepartmentDto;

    this.settingsService.updateDepartment(this.data.id, departmentDto)
      .subscribe(result => {
          this.logger.debug("updateDepartment response: ", result);
      });

    this.dialogRef.close();
  }

}
