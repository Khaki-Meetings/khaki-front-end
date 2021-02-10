import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {ClientOnboardingFacade} from '../../state/client-onboarding/client-onboarding.facade';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.scss']
})
export class ClientOnboardingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private clientOnboardingFacade: ClientOnboardingFacade
  ) {
  }

  form: FormGroup;

  companyNameFormControlName = 'companyName';
  adminEmailFormControlName = 'adminEmail';

  private logger: HistorianService;

  private saveClientOnboardingSuccessHandler = () => {
    this.logger.debug('saveClientOnboardingSuccessHandler');
    this.snackBar.dismiss();
    this
      .snackBar
      .open('Save Success', null, {duration: 2500});
    this.form.reset();
  };

  private saveClientOnboardingFailureHandler = (message: string) => {
    this.logger.debug('saveClientOnboardingFailureHandler', message);
    this.snackBar.dismiss();
    this
      .snackBar
      .open(`Save failed. ${message}`, null, {duration: 2500});
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        [this.companyNameFormControlName]: ['', Validators.required],
        [this.adminEmailFormControlName]: ['', [Validators.required, Validators.email]],
      }
    );

    this.clientOnboardingFacade.selectSaveClientOnboardingSuccess().subscribe(this.saveClientOnboardingSuccessHandler);
    this.clientOnboardingFacade.selectSaveClientOnboardingFailure().subscribe(this.saveClientOnboardingFailureHandler);
  }

  isFieldValid(field: string): boolean {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  formSubmit(): void {
    if (this.form.valid) {
      this
        .snackBar
        .open('Saving...');
      this.clientOnboardingFacade.dispatchSaveClientOnboarding(
        {
          name: this.form.controls[this.companyNameFormControlName].value,
          adminEmail: this.form.controls[this.adminEmailFormControlName].value
        }
      );
    }
  }
}
