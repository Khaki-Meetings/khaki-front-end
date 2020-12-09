import { Component, OnInit } from '@angular/core';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { UserProfileFacadeService } from '../../state/facades/user-profile-facade.service';

@Component({
  selector: 'lib-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.scss']
})
export class ProfileEmailComponent implements OnInit {

  userProfile: UserProfileResponseDto = {};
  constructor(private userProfileFacadeService: UserProfileFacadeService) { }

  ngOnInit(): void {
    this.userProfileFacadeService.userProfile()
      .subscribe(data => {
        this.userProfile = data as UserProfileResponseDto;
      });
  }

}
