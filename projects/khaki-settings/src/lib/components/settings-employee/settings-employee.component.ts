import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-settings-employee',
  templateUrl: './settings-employee.component.html',
  styleUrls: ['./settings-employee.component.scss']
})
export class SettingsEmployeeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
