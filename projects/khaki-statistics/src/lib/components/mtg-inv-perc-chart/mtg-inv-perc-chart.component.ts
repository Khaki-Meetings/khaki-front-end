import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import { single } from './data';
import { HoursMinutesPipe } from '../../pipes/hours-minutes.pipe';
import { DepartmentsStatisticsAggSm } from '../../state/models/departments-statistics-agg-sm';

interface SeriesPoint {
  name: string;
  value: number;
  hours: number;
  inventorySecondsAvailable: number;
}

interface GraphData {
  name: string;
  series: SeriesPoint[];
}

@Component({
  selector: 'lib-mtg-inv-perc-chart',
  templateUrl: './mtg-inv-perc-chart.component.html',
  styleUrls: ['./mtg-inv-perc-chart.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ HoursMinutesPipe ]
})

export class MtgInvPercChartComponent implements OnInit {

  perDepartmentStatistics: DepartmentsStatisticsAggSm;

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
    domain: ['#3182CE','#ea8c00']
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
                name: departmentData.name ? departmentData.name : 'Not Found',
                series: departmentData.series
              };
              this.chartData.push(newDataPoint);
            }
          );

          this.single = this.chartData;
          console.log('chart data', this.chartData); // was natr-historian  this.logger.debug

          var height = this.single.length * 35;
          if (height < 100) {
            height = 100;
          }
          this.view = [chartWidth, height];
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
    console.log("createGraphData");
      this.graphData = this.perDepartmentStatistics.internal.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          series: [{
            name: "Internal",
            value: el.totalSeconds /
              (el.inventorySecondsAvailable != 0 ? el.inventorySecondsAvailable : 1)
              * 100,
            hours: el.totalSeconds,
            inventorySecondsAvailable: el.inventorySecondsAvailable
          }]
        };
      });

      console.log('graph data X', this.graphData);

      this.perDepartmentStatistics.external.departmentsStatistics.forEach(x => {
        if (this.graphData.find(item => item.name == x.department) != null) {
          this.graphData.find(item => item.name == x.department).series.push(
            {
              name: "External",
              value: x.totalSeconds /
                (x.inventorySecondsAvailable != 0 ? x.inventorySecondsAvailable : 1)
                * 100,
              hours: x.totalSeconds,
              inventorySecondsAvailable: x.inventorySecondsAvailable
            }
          );
        } else {
          console.log("No internal value for department: " + x.department);
          this.graphData.push(
            {name: x.department,
              series: [
                {
                name: "External",
                value: x.totalSeconds /
                  (x.inventorySecondsAvailable != 0 ? x.inventorySecondsAvailable : 1)
                  * 100,
                hours: x.totalSeconds,
                inventorySecondsAvailable: x.inventorySecondsAvailable
              }]
            }
          );
        }
      });

      this.graphData.forEach(x => {

        if (x.series.find(item => item.name == "Internal") != null &&
          x.series.find(item => item.name == "External")) {

          let intVal = x.series.find(item => item.name == "Internal").value;
          x.series.find(item => item.name == "External").value =
            x.series.find(item => item.name == "External").value -
            intVal;

          let intHours = x.series.find(item => item.name == "Internal").hours;
          x.series.find(item => item.name == "External").hours =
            x.series.find(item => item.name == "External").hours -
            intHours;

        }
      });
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
