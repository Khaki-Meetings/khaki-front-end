import {Component, Input, OnInit} from '@angular/core';
import {LegendEntryComponent} from '@swimlane/ngx-charts';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ngx-charts-legend-entry-custom]',
  template: `
    <td class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"></td>
    <td class="legend-label-text">
      {{ trimmedLabel }}
    </td>
    <td class="legend-label-text legend-value-text">
      {{ dataExt.value | hoursMinutes }}
    </td>`,
  styleUrls: ['./legend-entry-custom.component.css']
})
export class LegendEntryCustomComponent extends LegendEntryComponent implements OnInit {

  @Input() dataExt: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

}
