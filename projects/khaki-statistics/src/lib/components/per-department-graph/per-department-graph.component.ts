import { Component, OnInit } from '@angular/core';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';

@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})
export class PerDepartmentGraphComponent implements OnInit {
  perDepartmentStatistics: PerDepartmentStatisticsSm;

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService) { }

  ngOnInit(): void {
    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          this.perDepartmentStatistics = data;
        }
      );
  }

}
