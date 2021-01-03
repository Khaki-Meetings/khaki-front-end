import {Component, OnInit} from '@angular/core';
import {UserProfileResponseDto} from '../../services/models/userProfileResponseDto';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';

@Component({
  selector: 'lib-profile-notifications',
  templateUrl: './profile-notifications.component.html',
  styleUrls: ['./profile-notifications.component.scss']
})
export class ProfileNotificationsComponent implements OnInit {

  userProfile: UserProfileResponseDto;

  constructor(private userProfileFacadeService: UserProfileFacadeService) {
  }

  checkedon = true;

  ngOnInit(): void {
    this.userProfileFacadeService.userProfile()
      .subscribe(data => {
        this.userProfile = data as UserProfileResponseDto;
        this.checkedon = this.userProfile.notifications === 'on';
      });
  }

  checkon(): void {
    this.checkedon = true;
  }

  checkoff(): void {
    this.checkedon = false;
  }

}
