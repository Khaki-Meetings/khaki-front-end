import { Component, OnInit } from '@angular/core';
import {SpinnerService} from './state/facades/spinner.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <p>
      <lib-time-based-stat-summary></lib-time-based-stat-summary>
    </p>
  `,
  styles: [
  ]
})
export class KhakiStatisticsComponent implements OnInit {
  isSpinning = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    // this.spinnerService.spinner().subscribe(isSpinning => this.isSpinning = isSpinning);
  }

}
