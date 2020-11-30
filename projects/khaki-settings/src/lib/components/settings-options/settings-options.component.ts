import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.scss']
})
export class SettingsOptionsComponent implements OnInit {

  menunow = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenu(e, menuname): void {
    if(this.menunow == menuname) {
      this.menunow = "";
      this.router.navigateByUrl("settings");
      e.preventDefault();
    } else {
      this.menunow = menuname;
    }
  }

}
