import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'lib-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  imgUrl: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.imgUrl = user.picture);
  }

}
