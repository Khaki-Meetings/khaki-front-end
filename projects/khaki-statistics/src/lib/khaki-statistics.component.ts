import {Component, OnInit} from '@angular/core';
import {SpinnerFacadeService} from './state/facades/spinner-facade.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <div class="padding">

      <div>
        <lib-time-based-stat-summary></lib-time-based-stat-summary>
      </div>

      <div class="space-between white-container">

        <div>
          <lib-organizers-table></lib-organizers-table>
        </div>
        <div>
          <lib-per-department-graph></lib-per-department-graph>

        </div>
      </div>
      <div class="white-container around-twelve">

        <lib-twelve-month-trailing-graph></lib-twelve-month-trailing-graph>
      </div>
      <div class="bottom-div"></div>
    </div>
<!--<div class="padding">-->

<!--  <div>-->
<!--    <lib-time-based-stat-summary></lib-time-based-stat-summary>-->
<!--  </div>-->

<!--  <div class="space-between white-container">-->

<!--    <div>-->
<!--      <lib-twelve-month-trailing-graph></lib-twelve-month-trailing-graph>-->

<!--    </div>-->
<!--    <div>-->
<!--      <lib-per-department-graph></lib-per-department-graph>-->

<!--    </div>-->
<!--  </div>-->
<!--  <div class="white-container around-twelve">-->
<!--    <lib-organizers-table></lib-organizers-table>-->


<!--  </div>-->
<!--  <div class="bottom-div"></div>-->
<!--</div>-->
  `,
  styles: [
      '.space-between { display: flex; justify-content: space-around}',
    '.padding { padding: 30px 50px ; background-color: #EEF8FF}',
    '.white-container { background-color: white; padding:30px}',
    '.bottom-div { background-color: white; padding: 10px; height: 400px;}',
  ]
})
export class KhakiStatisticsComponent implements OnInit {
  isSpinning = false;

  constructor(private spinnerService: SpinnerFacadeService) {
  }

  ngOnInit(): void {
    // this.spinnerService.spinner().subscribe(isSpinning => this.isSpinning = isSpinning);
  }

}
