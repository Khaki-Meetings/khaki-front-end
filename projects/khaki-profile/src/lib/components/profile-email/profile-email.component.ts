import { Component, OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'lib-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.scss']
})
export class ProfileEmailComponent implements OnInit {
  email: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.email = user.email);
  }

}
