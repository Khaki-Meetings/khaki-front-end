import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { UserProfileFacadeService } from '../../state/facades/user-profile-facade.service';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.scss']
})
export class SettingsOptionsComponent implements OnInit {
  private logger: HistorianService;

  menuNow = '';
  userProfile: UserProfileResponseDto = {};

  constructor(private router: Router, private userProfileFacade: UserProfileFacadeService) { }

  ngOnInit(): void {
    this.userProfileFacade.userProfile()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(userProfile => {
        this.logger.debug('onInit', userProfile);
        this.userProfile = userProfile;
      });
  }

  onMenu(e, menuname): void {
    if (this.menuNow === menuname) {
      this.menuNow = '';
      this.router.navigateByUrl('settings');
      e.preventDefault();
    } else {
      this.menuNow = menuname;
    }
  }

}
