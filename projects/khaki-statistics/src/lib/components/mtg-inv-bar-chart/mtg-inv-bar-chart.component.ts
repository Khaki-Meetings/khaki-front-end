import { Component, Renderer2, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {ColorHelper} from '@swimlane/ngx-charts';

import { multi } from './data';
import { DepartmentsStatisticsAggSm } from '../../state/models/departments-statistics-agg-sm';

interface GraphData {
  name: string;
  value: number;
  inventorySecondsAvailable: number;
}

@Component({
  selector: 'lib-mtg-inv-bar-chart',
  templateUrl: './mtg-inv-bar-chart.component.html',
  styleUrls: ['./mtg-inv-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MtgInvBarChartComponent implements OnInit {

  perDepartmentStatistics: DepartmentsStatisticsAggSm;

  multi: any[] = [];

   view: any[] = [700, 600];

   chartData: any[] = [];
   graphData: GraphData[] = []
   // options
   showXAxis: boolean = true;
   showYAxis: boolean = true;
   gradient: boolean = false;
   showLegend: boolean = true;
   showXAxisLabel: boolean = false;
   showYAxisLabel: boolean = false;
   schemeType: string = 'linear';
   legendPosition: string = 'below';
   showGridLines: boolean = false;
   barPadding: number = 0;

   colorScheme = {
     domain: ['#3182CE', '#48BB78', '#9F7AEA', '#ED64A6', '#667EEA', '#478aef', '#47ef88', '#b647ef', '#ef47ba', '#e3b755']
   };

   interval: IntervalSe;
   start: Moment;
   end: Moment;
   statisticsScope: StatisticsScopeSe;
   loading = false;

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService,
              private statisticsFiltersFacadeService: StatisticsFiltersFacade,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {

    Object.assign(this, { multi });

    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          console.log('data from state', data); // was natr-historian  this.logger.debug
          this.perDepartmentStatistics = data;
          this.createGraphData();

          console.log('graph data', this.graphData); // was natr-historian  this.logger.debug
          this.chartData = [];
          this.graphData.forEach(
            departmentData => {
              const newDataPoint = {
                name: departmentData.name,
                series: [{
                  name: "Hours in Meetings",
                  value: Math.round(departmentData.value / 60 / 60 * 100) / 100
                },
                {
                  name: "Total Hours Available",
                  value: Math.round(departmentData.inventorySecondsAvailable / 60 / 60 * 100) / 100
                }]
              };
              this.chartData.push(newDataPoint);
            }
          );

          this.multi = this.chartData;

          this.view = [700, this.chartData.length * 75];

          console.log('chart data', this.chartData); // was natr-historian  this.logger.debug
        });

    this.statisticsFiltersFacadeService.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.statisticsScope = statisticsFilters.statisticsScope;
      });

    this.perDepartmentStatisticsFacade.perDepartmentStatisticsLoading().subscribe(loading => this.loading = loading);

  }

  private createGraphData(): void {
    /*

    THIS WILL NEED TO BE UPDATED FOR THE NEW SERVICE W/O INT/EXT
    IF WE EVER DECIDE WE NEED IT AGAIN

    this.graphData = this.perDepartmentStatistics.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalSeconds,
          inventorySecondsAvailable: el.inventorySecondsAvailable
        };
      }
    );
    */
  }

  formatXaxis(x) {
    return x + ' hrs';
  }

  onActivate(data): void {}

  onDeactivate(data): void {}

  onSelect(data): void {}


}
