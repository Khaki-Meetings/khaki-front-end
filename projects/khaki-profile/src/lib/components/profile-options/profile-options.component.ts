import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { UserProfileFacadeService } from '../../state/facades/user-profile-facade.service';

@Component({
  selector: 'lib-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss']
})
export class ProfileOptionsComponent implements OnInit {

  menunow = '';
  userProfile: UserProfileResponseDto;

  constructor(private router: Router, private userProfileFacadeService: UserProfileFacadeService) { }

  ngOnInit(): void {
    this.userProfileFacadeService.userProfile()
      .subscribe(data => {
        this.userProfile = data as UserProfileResponseDto;
      });
  }

  onMenu(e, menuname): void {
    if (this.menunow === menuname) {
      this.menunow = '';
      this.router.navigateByUrl('profile');
      e.preventDefault();
    } else {
      this.menunow = menuname;
    }
  }

}
