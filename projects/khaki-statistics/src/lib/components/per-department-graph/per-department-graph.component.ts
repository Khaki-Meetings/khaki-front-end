import { Component, OnInit } from '@angular/core';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';

@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})
export class PerDepartmentGraphComponent implements OnInit {
  perDepartmentStatistics: PerDepartmentStatisticsSm;

  constructor() { }

  ngOnInit(): void {
  }

}
