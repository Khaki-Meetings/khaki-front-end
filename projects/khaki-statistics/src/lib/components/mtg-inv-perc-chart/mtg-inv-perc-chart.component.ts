import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import * as d3 from 'd3';

import { single } from './data';

interface GraphData {
  name: string;
  value: number;
  inventorySecondsAvailable: number;
}

@Component({
  selector: 'lib-mtg-inv-perc-chart',
  templateUrl: './mtg-inv-perc-chart.component.html',
  styleUrls: ['./mtg-inv-perc-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MtgInvPercChartComponent implements OnInit {

  perDepartmentStatistics: DepartmentsStatisticsSm;

  single: any[];
  view: any[] = [];

  chartData: any[] = [];
  graphData: GraphData[] = [];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  schemeType: string = 'linear';
  legendPosition: string = 'below';
  showGridLines: boolean = false;
  showDataLabel: boolean = false;

  colorScheme = {
    domain: ['#3182CE']
  };

  interval: IntervalSe;
  start: Moment;
  end: Moment;
  statisticsScope: StatisticsScopeSe;
  loading = false;

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService,
              private statisticsFiltersFacadeService: StatisticsFiltersFacade,
              private el:ElementRef) {

  }

  ngOnInit(): void {

    Object.assign(this, { single });

    var graphElement = this.el.nativeElement.querySelector('.graph');
    var chartWidth = graphElement.clientWidth * 0.9;

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
                value: Math.floor(departmentData.value / departmentData.inventorySecondsAvailable * 100),
                hours: departmentData.value
              };
              this.chartData.push(newDataPoint);
            }
          );

          this.single = this.chartData;

          this.view = [chartWidth, this.single.length * 35];

          console.log('INV chart data', this.chartData); // was natr-historian  this.logger.debug

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
    this.graphData = this.perDepartmentStatistics.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalSeconds,
          inventorySecondsAvailable: el.inventorySecondsAvailable
        };
      }
    );
  }

  formatXaxis(x) {
    return x + '%';
  }

  onActivate(data): void {}

  onDeactivate(data): void {}

  onSelect(data): void {}

  onResize(event) {
    var graphElement = this.el.nativeElement.querySelector('.graph');
    var chartWidth = graphElement.clientWidth * 0.9;

    this.view = [chartWidth, this.single.length * 35];
  }
}
