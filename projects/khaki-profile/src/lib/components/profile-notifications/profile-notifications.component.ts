import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-profile-notifications',
  templateUrl: './profile-notifications.component.html',
  styleUrls: ['./profile-notifications.component.scss']
})
export class ProfileNotificationsComponent implements OnInit {

  constructor() { }

  checkedon = true;
  ngOnInit(): void {
  }

  checkon(): void {
    this.checkedon = true;
  }

  checkoff(): void {
    this.checkedon = false;
  }

}
