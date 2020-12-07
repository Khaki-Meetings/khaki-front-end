import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileFacadeService } from '../../state/facades/user-profile-facade.service';
import { UserProfileSm } from '../../state/models/user-profile-sm';

@Component({
  selector: 'lib-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.scss']
})
export class SettingsOptionsComponent implements OnInit {

  menunow = "";
  userProfile: UserProfileSm = {};

  constructor(private router: Router, private userProfileService: UserProfileFacadeService) { }

  ngOnInit(): void {
    this.userProfileService.userProfile()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(userProfile => {
        //this.logger.debug('onInit', userProfile);
        this.userProfile = userProfile;
      });
  }

  onMenu(e, menuname): void {
    if(this.menunow == menuname) {
      this.menunow = "";
      this.router.navigateByUrl("settings");
      e.preventDefault();
    } else {
      this.menunow = menuname;
    }
  }

}
