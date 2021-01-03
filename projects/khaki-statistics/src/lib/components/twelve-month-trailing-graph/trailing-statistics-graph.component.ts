import {Component, OnInit} from '@angular/core';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {TrailingStatisticsSm} from '../../state/models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import * as moment from 'moment';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';
import {switchMap, tap} from 'rxjs/operators';
import {Utilities} from '../../services/utilities';
import {IntervalSe} from '../../state/models/interval-se';

const momentJs = moment;

@Logging
@Component({
  selector: 'lib-twelve-month-trailing-graph',
  templateUrl: './trailing-statistics-graph.component.html',
  styleUrls: ['./trailing-statistics-graph.component.scss']
})
export class TrailingStatisticsGraphComponent implements OnInit {

  constructor(
    private trailingStatisticsFacade: TrailingStatisticsFacadeService,
    private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService
  ) {
  }

  private logger: HistorianService;

  graphData: { name: string, value: number }[] = [];

  view: any[] = [700, 400];

  // options
  // class = 'border-radius: 45px';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Hours';
  currentInterval: IntervalEnum = IntervalEnum.Week;

  colorScheme = {
    domain: ['#3182CE']
  };


  ngOnInit(): void {
    this.currentTimeIntervalFacade
      .currentTimeInterval()
      .pipe(
        tap(interval => this.logger.debug('current interval', interval)),
        switchMap((interval: IntervalSe) => {
            this.currentInterval = IntervalEnum[interval];
            return this.trailingStatisticsFacade.trailingStatistics();
          }
        )
      )
      .subscribe(trailingStatistics => this.createGraphData(trailingStatistics));
  }

  private createGraphData(trailingStatistics: TrailingStatisticsSm): void {
    const timeBlocks = this.getIntervalLabels();
    this.logger.debug('timeBlocks', timeBlocks);
    this.graphData = trailingStatistics.timeBlockSummaries.map(
      (timeBlockSummary, index) => {
        const totalSeconds = (timeBlockSummary.totalSeconds && typeof timeBlockSummary.totalSeconds !== 'number')
          ? timeBlockSummary.totalSeconds : 0;
        const value = totalSeconds / 3600;
        const name = timeBlocks[index];
        return {
          name,
          value,
          extra: {
            customLabel: Utilities.formatHrsMins(timeBlockSummary.totalSeconds)
          }
        };
      }
    );

    this.logger.debug('graphData', this.graphData);
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
    this.logger.debug('current format', currentMoment.format(format));
    for (let i = 0; i < 12; i++) {
      timeBlocks.push(currentMoment.format(format));
      currentMoment.subtract(1, unit);
    }

    return timeBlocks;
  }
}
