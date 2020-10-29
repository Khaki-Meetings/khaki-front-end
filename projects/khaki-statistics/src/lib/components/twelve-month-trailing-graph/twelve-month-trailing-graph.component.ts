import { Component, OnInit } from '@angular/core';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {TimeBlockEnum} from '../../state/models/time-block.enum';

@Component({
  selector: 'lib-twelve-month-trailing-graph',
  templateUrl: './twelve-month-trailing-graph.component.html',
  styleUrls: ['./twelve-month-trailing-graph.component.scss']
})
export class TwelveMonthTrailingGraphComponent implements OnInit {

  constructor(private trailingStatisticsFacade: TrailingStatisticsFacadeService) { }

  ngOnInit(): void {
    // this.trailingStatisticsFacade.requestTrailingStatistics(TimeBlock.Month, 1);
  }

}
