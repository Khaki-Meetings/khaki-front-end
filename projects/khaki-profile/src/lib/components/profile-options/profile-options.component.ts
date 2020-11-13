import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss']
})
export class ProfileOptionsComponent implements OnInit {

  menunow = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenu(e, menuname): void {
    if(this.menunow == menuname) {
      this.menunow = "";
      this.router.navigateByUrl("profile");
      e.preventDefault();
    } else {
      this.menunow = menuname;
    }
  }

}
