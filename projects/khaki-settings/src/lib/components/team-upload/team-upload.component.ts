import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HistorianService, Logging } from '@natr/historian';
import { SettingsService } from '../../services/settings.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DialogError {
  row: number;
  errorDescription: string;
  content: string;
}

export class DialogSuccess {
  row: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export class DialogData {
  errors: DialogError[];
  successes: DialogSuccess[];
  formData: FormData;

  constructor() {
    this.errors = new DialogError[0];
    this.successes = new DialogSuccess[0];
  }
}

@Logging
@Component({
  selector: 'lib-team-upload',
  templateUrl: './team-upload.component.html',
  styleUrls: ['./team-upload.component.scss']
})
export class TeamUploadComponent implements OnInit {

  fileName = '';
  private logger: HistorianService;
  verificationResults: DialogData;

  constructor(private http: HttpClient,
      public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onFileSelected(event) {

    try {
      const file:File = event.target.files[0];
      this.logger.debug("File ", file);

      if (file) {
          this.fileName = file.name;
          this.verifyFile(file);
      }
    } catch (error) {

    }
  }

  verifyFile(file: File): Promise<DialogData> {

    let dialogErrors: DialogError[];
    dialogErrors = [];

    let dialogSuccesses: DialogSuccess[];
    dialogSuccesses = [];

    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        let csv: string = fileReader.result.toString();
        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');

        // Verify the header Line exists
        if ((headers[0] != 'firstName') ||
            (headers[1] != 'lastName') ||
            (headers[2] != 'email') ||
            (headers[3] != 'department')) {
          let err: DialogError;
          err =
          {
            errorDescription: "Invalid Header",
            row: 1,
            content: headers.toString()
          }
          dialogErrors.push(err);
        }

        for (let i = 1; i < allTextLines.length - 1; i++) {
          // split content based on comma
          let data = allTextLines[i].split(',');
          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }

            let firstName = data[0];
            let lastName = data[1];
            let email = data[2];
            let department = data[3];

            let localDialogErrors: DialogError[];
            localDialogErrors = [];

            if (!firstName || firstName.length == 0) {
              let err =
              {
                errorDescription: "Missing First Name",
                row: i,
                content: data.toString()
              }
              localDialogErrors.push(err);
            }

            if (!lastName || lastName.length == 0) {
              let err =
              {
                errorDescription: "Missing Last Name",
                row: i,
                content: data.toString()
              }
              localDialogErrors.push(err);
            }

            if (!email || email.length == 0) {
              let err =
              {
                errorDescription: "Missing Email",
                row: i,
                content: data.toString()
              }
              localDialogErrors.push(err);
            } else {
              // This could later be broken into a separate function
              // for unit testing
              const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!re.test(String(email).toLowerCase())) {
                let err =
                {
                  errorDescription: "Invalid Email",
                  row: i,
                  content: data.toString()
                }
                localDialogErrors.push(err);
              }
            }

            if (!department || department.length == 0) {
              let err =
              {
                errorDescription: "Missing Department",
                row: i,
                content: data.toString()
              }
              localDialogErrors.push(err);
            }

            if (localDialogErrors.length > 0) {
              dialogErrors = [...dialogErrors, ...localDialogErrors];
            } else {
              let success: DialogSuccess;
              success =
              {
                row: i,
                firstName: data[0],
                lastName: data[1],
                email: data[2],
                department: data[3]
              }
              dialogSuccesses.push(success);
            }
          } else {
            let err: DialogError;
            err =
            {
              errorDescription: "Not Enough Elements",
              row: i,
              content: data.toString()
            }
            dialogErrors.push(err);
          }
        }

        const formDataTmp = new FormData();
        formDataTmp.append("file", file);

        let dialogData: DialogData;
        dialogData = {
          errors: dialogErrors,
          successes: dialogSuccesses,
          formData: formDataTmp
        }

        fileReader.onloadend = (e) => {
            this.logger.debug("ONLOADEND");
            const dialogRef = this.dialog.open(CsvContentVerificationComponent,
                { data: dialogData } );
        }

        return Promise.resolve(dialogData);
      }
    } catch (e) {
      this.logger.debug(e);
    }

    return Promise.resolve(null);
  }

}

@Logging
@Component({
  selector: 'lib-csv-content-verification',
  templateUrl: 'csv-content-verification.html',
  styleUrls: ['./csv-content-verification.scss']
})
export class CsvContentVerificationComponent {
  private logger: HistorianService;
  importDisabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CsvContentVerificationComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (data.errors && data.errors.length > 1) {
        this.importDisabled = true;
      }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  import(): void {
    this.settingsService.uploadFile(this.data.formData).subscribe();
    this.dialogRef.close();
  }
}
