import {Component, OnInit} from '@angular/core';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';

@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})
export class PerDepartmentGraphComponent implements OnInit {
  perDepartmentStatistics: PerDepartmentStatisticsSm;

  single = [
    {
      name: 'Sales',
      value: 8940000
    },
    {
      name: 'Finance',
      value: 5000000
    },
    {
      name: 'Development',
      value: 7200000
    },
    {
      name: 'Customer Service',
      value: 7200000
    },
    {
      name: 'IT Support',
      value: 7200000
    },
    {
      name: 'Manufacturing',
      value: 7200000
    },
    {
      name: 'Home',
      value: 7200000
    },
    {
      name: 'HR',
      value: 6200000
    }
  ];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#3991CF', '#D6EDFE', '#D6EDFE', '#70CDB8', '#98E3D1', '#ACF8E7', '#D7FFF5', '#80C1EF']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService) {
    // Object.assign(this, {single, multi});
  }

  ngOnInit(): void {
    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          this.perDepartmentStatistics = data;
        }
      );

    this.perDepartmentStatisticsFacade.requestPerDepartmentStatistics();
  }

}
