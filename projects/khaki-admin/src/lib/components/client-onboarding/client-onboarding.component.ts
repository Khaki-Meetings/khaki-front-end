import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.scss']
})
export class ClientOnboardingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
  }

  form: FormGroup;

  companyNameFormControlName = 'companyName';
  adminEmailFormControlName = 'companyName';
  domainFormControlName = 'companyName';

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        [this.companyNameFormControlName]: '',
        [this.adminEmailFormControlName]: '',
        [this.domainFormControlName]: ''
      }
    );
  }

}
