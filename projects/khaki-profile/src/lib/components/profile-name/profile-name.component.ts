import { Component, OnInit } from '@angular/core';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { UserProfileFacadeService } from '../../state/facades/user-profile-facade.service';

@Component({
  selector: 'lib-profile-name',
  templateUrl: './profile-name.component.html',
  styleUrls: ['./profile-name.component.scss']
})
export class ProfileNameComponent implements OnInit {

  userProfile: UserProfileResponseDto = {};
  constructor(private userProfileFacadeService: UserProfileFacadeService) { }

  editmode = false;
  ngOnInit(): void {
    this.userProfileFacadeService.userProfile()
      .subscribe(data => {
        this.userProfile = data as UserProfileResponseDto;
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
