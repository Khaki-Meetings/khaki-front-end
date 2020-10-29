import { Component, OnInit } from '@angular/core';
import {SpinnerFacadeService} from './state/facades/spinner-facade.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <p>
      <lib-time-based-stat-summary></lib-time-based-stat-summary>
    </p>
    <p><lib-organizers-table></lib-organizers-table></p>
  `,
  styles: [
  ]
})
export class KhakiStatisticsComponent implements OnInit {
  isSpinning = false;

  constructor(private spinnerService: SpinnerFacadeService) { }

  ngOnInit(): void {
    // this.spinnerService.spinner().subscribe(isSpinning => this.isSpinning = isSpinning);
  }

}
