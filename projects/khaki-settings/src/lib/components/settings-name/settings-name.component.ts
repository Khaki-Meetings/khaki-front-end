import {Component, OnInit} from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {UserProfileResponseDto} from '../../services/models/userProfileResponseDto';
import {SettingsService} from '../../services/settings.service';
import {OrganizationResponseDto} from '../../services/models/organizationResponseDto';

@Logging
@Component({
  selector: 'lib-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.scss']
})
export class SettingsNameComponent implements OnInit {
  private logger: HistorianService;
  userProfile: UserProfileResponseDto = {};

  constructor(private userProfileService: UserProfileFacadeService,
    private settingService: SettingsService) {
  }

  editMode = false;
  organization: OrganizationResponseDto;

  ngOnInit(): void {

    this.settingService
      .getCompany()
      .subscribe(data => {
        this.organization = data as OrganizationResponseDto;
      }
    );

    this.userProfileService.userProfile()
      .subscribe(userProfile => {
        this.userProfile = userProfile;
      });

  }

  onChange(): void {
    this.editMode = true;
  }

  onCancel(): void {
    this.editMode = false;
  }

}
