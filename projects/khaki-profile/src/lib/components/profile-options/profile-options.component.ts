import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'lib-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss']
})
export class ProfileOptionsComponent implements OnInit {

  menuNow = '';
  displayName: string;
  email: string;

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService
      .user$
      .subscribe(
        user => {
          this.displayName = user.name;
          this.email = user.email;
        }
      );
  }

  onMenu(e, menuname): void {
    if (this.menuNow === menuname) {
      this.menuNow = '';
      this.router.navigateByUrl('profile');
      e.preventDefault();
    } else {
      this.menuNow = menuname;
    }
  }

}
