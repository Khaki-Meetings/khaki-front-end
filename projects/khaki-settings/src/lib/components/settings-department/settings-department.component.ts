import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-settings-department',
  templateUrl: './settings-department.component.html',
  styleUrls: ['./settings-department.component.scss']
})
export class SettingsDepartmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
