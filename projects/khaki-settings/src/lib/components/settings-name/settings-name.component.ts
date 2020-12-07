import { Component, OnInit } from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';
import { UserProfileSm } from '../../state/models/user-profile-sm';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.scss']
})
export class SettingsNameComponent implements OnInit {
  private logger: HistorianService;
  userProfile: UserProfileSm = {};

  constructor(private userProfileService: UserProfileFacadeService) { }

  editmode = false;
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
  }

  onCancel(): void {
    this.editmode = false;
  }
}
