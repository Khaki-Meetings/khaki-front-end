import {Component, OnInit} from '@angular/core';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-khaki-statistics',
  templateUrl: './khaki-statistics.component.html',
  styleUrls: ['./khaki-statistics.component.scss']
})
export class KhakiStatisticsComponent implements OnInit {
  private logger: HistorianService;
  isSpinning = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
