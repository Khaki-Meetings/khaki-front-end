import {Component, OnInit} from '@angular/core';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {TrailingStatisticsSm} from '../../state/models/trailing-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

@Component({
  selector: 'lib-twelve-month-trailing-graph',
  templateUrl: './twelve-month-trailing-graph.component.html',
  styleUrls: ['./twelve-month-trailing-graph.component.scss']
})
export class TwelveMonthTrailingGraphComponent implements OnInit {
  twelveMonthTrailingStatistics: TrailingStatisticsSm = {
    timeBlock: IntervalEnum.Month,
    timeBlockSummaries: [
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      },
      {
        timeBlock: IntervalEnum.Month,
        totalCost: 100099000000.34
      }
    ],
    count: 12
  };


  single = [];

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
  yAxisLabel = 'Current Costs';

  colorScheme = {
    domain: ['#CEEDE6', '#ADF8E6', '#BFDDF3', '#D6EEFF']

  };

  constructor(private trailingStatisticsFacade: TrailingStatisticsFacadeService) {
    const monthName = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    this.single = this.twelveMonthTrailingStatistics.timeBlockSummaries.map(
      timeBlockSummary => {
        return {
          name: monthName.shift(),
          value: timeBlockSummary.totalCost
        };
      }
    );
  }

  ngOnInit(): void {
    // this.trailingStatisticsFacade.requestTrailingStatistics(TimeBlock.Month, 1);
  }
}
