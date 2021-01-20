import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';

@Component({
  selector: 'lib-settings-employee',
  templateUrl: './settings-employee.component.html',
  styleUrls: ['./settings-employee.component.scss']
})
export class SettingsEmployeeComponent implements OnInit {
  interval;
  statisticsScope;

  constructor(private router: Router, private statisticsFiltersFacade: StatisticsFiltersFacade) {
  }

  ngOnInit(): void {

  }

  goBack(): void {
    this.router.navigateByUrl('settings/employees');
  }
}
