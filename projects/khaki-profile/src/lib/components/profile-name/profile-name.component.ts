import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'lib-profile-name',
  templateUrl: './profile-name.component.html',
  styleUrls: ['./profile-name.component.scss']
})
export class ProfileNameComponent implements OnInit {
  editMode = false;

  firstName: string;
  lastName: string;
  displayName: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$
      .subscribe(user => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.displayName = user.name;
      });
  }

  onChange(): void {
    this.editMode = true;
  }

  onSave(): void {
    this.editMode = false;
  }

  onCancel(): void {
    this.editMode = false;
  }
}
