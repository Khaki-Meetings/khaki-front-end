import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
    </td>
    <td class="legend-label-text legend-value-text">
      {{ formattedInventoryUsage }}
    </td>`,
  styleUrls: ['./legend-entry-custom.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  get inventoryUsageDisplay(): string {
    return this.dataExt.inventorySecondsAvailable || 'N/A';
  }

  get formattedInventoryUsage(): string {
    if (!this.dataExt.inventorySecondsAvailable || this.dataExt.inventorySecondsAvailable == 0) {
      return "N/A";
    }
    return Math.floor(this.dataExt.value / this.dataExt.inventorySecondsAvailable * 100) + "%";
  }
}
