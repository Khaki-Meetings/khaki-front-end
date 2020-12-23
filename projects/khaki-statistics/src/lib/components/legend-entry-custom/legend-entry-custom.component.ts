import {Component, OnInit, Input} from '@angular/core';
import {LegendEntryComponent} from '@swimlane/ngx-charts';
import {Utilities} from '../../services/utilities';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ngx-charts-legend-entry-custom]',
  template: `
    <td class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"></td>
    <td class="legend-label-text">
      {{ trimmedLabel }}
    </td>
    <td class="legend-label-text legend-value-text">
      {{ displayValue }}
    </td>`,
  styleUrls: ['./legend-entry-custom.component.css']
})

export class LegendEntryCustomComponent extends LegendEntryComponent implements OnInit{

  @Input() dataExt: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

  get displayValue(): string {
    let displayValue = '';
    if (this.dataExt.value !== 0) {
      displayValue = Utilities.formatHrsMins(this.dataExt.value)
    }
    return displayValue || '(empty)';
  }

}
