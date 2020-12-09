import {Component, OnInit} from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {UserProfileResponseDto} from '../../services/models/userProfileResponseDto';
import {SettingsService} from '../../services/settings.service';

@Logging
@Component({
  selector: 'lib-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.scss']
})
export class SettingsNameComponent implements OnInit {
  private logger: HistorianService;
  userProfile: UserProfileResponseDto = {};

  constructor(private userProfileService: UserProfileFacadeService, private settingService: SettingsService) {
  }

  editMode = false;
  companyName = '';

  ngOnInit(): void {
    this.settingService
      .getCompany()
      .subscribe(organization => this.companyName = organization.name);

    this.userProfileService.userProfile()
      .subscribe(userProfile => {
        this.userProfile = userProfile;
      });
  }

  onChange(): void {
    this.editMode = true;
  }

  onSave(): void {
    this.editMode = false;
    this.userProfileService.setUserProfile({companyName: this.companyName})
      .subscribe(result => {
        this.logger.debug('onSave', this.companyName);
      });
  }

  onCancel(): void {
    this.editMode = false;
  }
}
