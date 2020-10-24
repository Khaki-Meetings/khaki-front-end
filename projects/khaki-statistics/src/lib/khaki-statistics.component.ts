import { Component, OnInit } from '@angular/core';
import {SpinnerService} from './state/facades/spinner.service';

@Component({
  selector: 'lib-khaki-statistics',
  template: `
    <p>
      khaki-statistics works!
    </p>
  `,
  styles: [
  ]
})
export class KhakiStatisticsComponent implements OnInit {
  isSpinning = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
