import { Component, OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'lib-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss']
})
export class SettingsHeaderComponent implements OnInit {
  userImgUrl: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.userImgUrl = user.picture);
  }

}
