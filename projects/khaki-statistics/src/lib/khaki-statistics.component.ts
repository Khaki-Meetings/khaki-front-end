import { Component, OnInit } from '@angular/core';
import {SpinnerFacadeService} from './state/facades/spinner-facade.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <p>
      <lib-per-department-graph></lib-per-department-graph>
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
