import {Component, OnInit} from '@angular/core';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {TrailingStatisticsSm} from '../../state/models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-twelve-month-trailing-graph',
  templateUrl: './twelve-month-trailing-graph.component.html',
  styleUrls: ['./twelve-month-trailing-graph.component.scss']
})
export class TwelveMonthTrailingGraphComponent implements OnInit {
  private logger: HistorianService;

  graphData: { name: string, value: number }[] = [];

  view: any[] = [700, 400];

  // options
  // class = 'border-radius: 45px';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Hours';

  colorScheme = {
    domain: ['#3182CE']
  };

  constructor(private trailingStatisticsFacade: TrailingStatisticsFacadeService) {
  }

  ngOnInit(): void {
    this.trailingStatisticsFacade.trailingStatistics()
      .subscribe(
        trailingStatistics => this.createGraphData(trailingStatistics)
      );
    this.trailingStatisticsFacade.requestTrailingStatistics(IntervalEnum.Month, 12);
  }

  private createGraphData(trailingStatistics: TrailingStatisticsSm): void {
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.graphData = trailingStatistics.timeBlockSummaries.map(
      timeBlockSummary => {
        return {
          name: monthName.shift(),
          value: timeBlockSummary.totalHours
        };
      }
    );

    this.logger.debug('graphData', this.graphData);
  }
}
