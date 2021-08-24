import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistorianService, Logging } from '@natr/historian';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Logging
@Component({
  selector: 'lib-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {

  private logger: HistorianService;

  constructor(
    public dialogRef: MatDialogRef<AddTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
    { name: string },
      private departmentsFacadeService: DepartmentsFacadeService,
      private settingsService: SettingsService) {  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const name = this.data.name;

    this.logger.debug('save', name);

    this.settingsService.addDepartment(name)
      .subscribe(result => {
          this.logger.debug("addDepartment department: ", result);
      });

    this.dialogRef.close();
  }

}
