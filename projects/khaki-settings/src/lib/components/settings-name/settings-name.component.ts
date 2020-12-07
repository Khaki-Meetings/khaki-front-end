import { Component, OnInit } from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';

@Logging
@Component({
  selector: 'lib-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.scss']
})
export class SettingsNameComponent implements OnInit {
  private logger: HistorianService;
  userProfile: UserProfileResponseDto = {};

  constructor(private userProfileService: UserProfileFacadeService) { }

  editmode = false;
  companyname = "";

  ngOnInit(): void {
    this.userProfileService.userProfile()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(userProfile => {
        //this.logger.debug('onInit', userProfile);
        this.userProfile = userProfile;
      });
  }

  onChange(): void {
    this.editmode = true;
  }

  onSave(): void {
    this.editmode = false;
    this.userProfileService.setUserProfile({companyname: this.companyname})
    .subscribe(result => {
      this.logger.debug('onSave', this.companyname);
    });
  }

  onCancel(): void {
    this.editmode = false;
  }
}
