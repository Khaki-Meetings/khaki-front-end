import {Component, OnInit} from '@angular/core';
import {SpinnerFacadeService} from './state/facades/spinner-facade.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <div>
      <div>
        <lib-time-based-stat-summary></lib-time-based-stat-summary>
      </div>
      <div>
        <lib-per-department-graph></lib-per-department-graph>
      </div>
      <div>
        <lib-organizers-table></lib-organizers-table>
      </div>
      <div>
        <lib-twelve-month-trailing-graph></lib-twelve-month-trailing-graph>
      </div>
    </div>

  `,
  styles: []
})
export class KhakiStatisticsComponent implements OnInit {
  isSpinning = false;

  constructor(private spinnerService: SpinnerFacadeService) {
  }

  ngOnInit(): void {
    // this.spinnerService.spinner().subscribe(isSpinning => this.isSpinning = isSpinning);
  }

}
