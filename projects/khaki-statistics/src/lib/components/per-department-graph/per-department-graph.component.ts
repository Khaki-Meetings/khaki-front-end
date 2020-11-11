import {Component, OnInit} from '@angular/core';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';

interface GraphData {
  name: string;
  value: number;
}

@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})
export class PerDepartmentGraphComponent implements OnInit {
  perDepartmentStatistics: PerDepartmentStatisticsSm;

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#3991CF', '#D6EDFE', '#70CDB8', '#98E3D1', '#ACF8E7', '#D7FFF5', '#80C1EF']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  graphData: GraphData[] = [];

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService) {
  }


  ngOnInit(): void {
    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          this.perDepartmentStatistics = data;
          this.createGraphData();
        }
      );
  }

  private createGraphData(): void {
    this.graphData = this.perDepartmentStatistics.departmentStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalHours
        };
      }
    );
  }

}
