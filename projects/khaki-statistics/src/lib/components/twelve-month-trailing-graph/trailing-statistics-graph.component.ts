import {Component, OnInit} from '@angular/core';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {TrailingStatisticsSm} from '../../state/models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import * as moment from 'moment';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';
import {switchMap} from 'rxjs/operators';
import {IntervalSe} from '../../state/models/interval-se';
import { TrailingStatisticsAggSm } from '../../state/models/trailing-statistics-agg-sm';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import { Moment } from 'moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import { ElementRef } from '@angular/core';

const momentJs = moment;


interface SeriesPoint {
  name: string;
  value: number;
  hours: number;
}

interface GraphData {
  name: string;
  series: SeriesPoint[];
}

@Logging
@Component({
  selector: 'lib-twelve-month-trailing-graph',
  templateUrl: './trailing-statistics-graph.component.html',
  styleUrls: ['./trailing-statistics-graph.component.scss']
})

export class TrailingStatisticsGraphComponent implements OnInit {

  constructor(
    private trailingStatisticsFacade: TrailingStatisticsFacadeService,
    private statisticsFiltersFacadeService: StatisticsFiltersFacade,
    private el:ElementRef
  ) {
  }

  private logger: HistorianService;

  view: any[] = [700, 400];
  graphData: GraphData[];
  chartData: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Hours';
  currentInterval: IntervalEnum = IntervalEnum.Week;

  colorScheme = {
    domain: ['#3182CE','#ea8c00']
  };

  interval: IntervalSe;
  start: Moment;
  end: Moment;
  statisticsScope: StatisticsScopeSe;
  loading = false;

  trailingStatistics: TrailingStatisticsAggSm;

  ngOnInit(): void {

    var graphElement = this.el.nativeElement.querySelector('ngx-charts-bar-vertical-stacked');
    var chartWidth = graphElement.clientWidth * 0.9;

    this.trailingStatisticsFacade.trailingStatistics()
      .subscribe(
        (data) => {
          console.log('trailing statistics data from state', data); // was natr-historian  this.logger.debug
          this.trailingStatistics = data;
          this.createGraphData();

          console.log('graph data', this.graphData); // was natr-historian  this.logger.debug
          this.chartData = [];
          this.graphData.forEach(
            departmentData => {
              const newDataPoint = {
                name: departmentData.name,
                series: departmentData.series
              };
              this.chartData.push(newDataPoint);
            }
          );

          this.view = [chartWidth, this.chartData.length * 35];
          console.log('chart data', this.chartData); // was natr-historian  this.logger.debug
        });

    this.statisticsFiltersFacadeService.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.statisticsScope = statisticsFilters.statisticsScope;
      });

    this.trailingStatisticsFacade.trailingStatisticsLoading()
      .subscribe(loading => this.loading = loading);
  }

  private createGraphData(): void {

    const timeBlocks = this.getIntervalLabels().reverse();

    console.log("trailing statistics " + JSON.stringify(this.trailingStatistics));

/*    const reverseTrailingStatistics = {
      timeBlock: trailingStatistics.timeBlock,
      timeBlockSummaries: [...trailingStatistics.external.timeBlockSummaries].reverse(),
      count: trailingStatistics.count
    } as TrailingStatisticsAggSm;
*
/*

    this.graphData = reverseTrailingStatistics.timeBlockSummaries.map(
      (timeBlockSummary, index) => {
        const totalSeconds = (timeBlockSummary.totalSeconds && typeof timeBlockSummary.totalSeconds === 'number')
          ? timeBlockSummary.totalSeconds : 0;
        const value = totalSeconds / 3600;
        const name = timeBlocks[index];
        return {
          name,
          value,
          extra: {
            totalSeconds: timeBlockSummary.totalSeconds
          }
        };
      }
    ); */



    this.graphData = this.trailingStatistics.internal.timeBlockSummaries.map(
      (timeBlockSummary, index) => {
        const totalSeconds = (timeBlockSummary.totalSeconds && typeof timeBlockSummary.totalSeconds === 'number')
          ? timeBlockSummary.totalSeconds : 0;
        const value = totalSeconds / 3600;
        const name = timeBlocks[index];
        return {
          name,
          value,
          series: [{
            name: "Internal",
            value: Math.floor(timeBlockSummary.totalSeconds / 3600),
            hours: timeBlockSummary.totalSeconds,
            extra: {
              totalSeconds: timeBlockSummary.totalSeconds
            }
          }]
        };
      }
    );

    console.log("TRAILING STATISTICS " + JSON.stringify(this.graphData));

  /*  this.trailingStatistics.external.timeBlockSummaries.forEach((x, index) => {
      this.graphData.find(item => item.name == x.start).series.push(
          {
            name: "External",
            value: Math.floor(x.totalSeconds / 3600),
            hours: x.totalSeconds
          }
        );
    });
*/
    this.trailingStatistics.external.timeBlockSummaries.forEach((x, index) => {
      this.graphData[index].series.push({
        name: "External",
        value: Math.floor(x.totalSeconds / 3600),
        hours: x.totalSeconds
      })

    });

    this.graphData.forEach(x => {
      let intVal = x.series.find(item => item.name == "Internal").value;

      x.series.find(item => item.name == "External").value =
        x.series.find(item => item.name == "External").value -
        intVal;

      let intHours = x.series.find(item => item.name == "Internal").hours;

      x.series.find(item => item.name == "External").hours =
        x.series.find(item => item.name == "External").hours -
        intHours;

    });

  }

  private getIntervalLabels(): string[] {
    let format: string;
    let unit: 'weeks' | 'months';
    switch (this.currentInterval) {
      case IntervalEnum.Week:
        format = 'M/DD';
        unit = 'weeks';
        this.xAxisLabel = 'Start of Week';
        break;
      case IntervalEnum.Month:
        format = 'MMM';
        unit = 'months';
        this.xAxisLabel = 'Month';
        break;
      default:
        format = 'M/DD';
        unit = 'weeks';
    }

    const timeBlocks: string[] = [];
    const currentMoment = momentJs().startOf(unit);
    for (let i = 0; i < 12; i++) {
      timeBlocks.push(currentMoment.format(format));
      currentMoment.subtract(1, unit);
    }

    return timeBlocks;
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

}
