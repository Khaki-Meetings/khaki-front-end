import {Component, OnInit} from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';

@Component({
  selector: 'lib-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {

  constructor(private userProfileFacadeService: UserProfileFacadeService) {
  }

  ngOnInit(): void {
    this.userProfileFacadeService.requestUserProfile();
  }

}
