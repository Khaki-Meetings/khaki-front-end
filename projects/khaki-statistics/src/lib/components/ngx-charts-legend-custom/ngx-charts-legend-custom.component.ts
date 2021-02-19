import {ChangeDetectorRef, Component, Input, ElementRef, Inject} from '@angular/core';
import {formatLabel, LegendComponent} from '@swimlane/ngx-charts';
import { PerDepartmentGraphComponent } from '../per-department-graph/per-department-graph.component'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-charts-legend-custom',
  templateUrl: './ngx-charts-legend-custom.component.html',
  styleUrls: ['./ngx-charts-legend-custom.component.css']
})

export class NgxChartsLegendCustomComponent extends LegendComponent {

  @Input() dataExt: any;

  constructor(cd: ChangeDetectorRef,
      private elementRef: ElementRef,
      @Inject(PerDepartmentGraphComponent) private parent: PerDepartmentGraphComponent) {
    super(cd);
  }

  getLegendEntries(): any[] {
    const items = [];
    for (const label of this.data) {
      const dataExt = this.dataExt.find(x => x.name === label);
      const formattedLabel = formatLabel(label);
      const idx = items.findIndex(i => {
        return i.label === formattedLabel;
      });
      const formattedInventoryUsage = dataExt.totalSeconds / dataExt.inventorySecondsAvailable * 100;

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          dataExt,
          formattedInventoryUsage,
          color: this.colors.getColor(label)
        });
      }
    }
    return items;
  }

  getMatchingArcPath(index): Element {
    return this.parent.getMatchingArcPath(index);
  }

  mouseenter(index): void {
    const event = new MouseEvent('mouseenter', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    const arcPath = this.getMatchingArcPath(index);
    if (arcPath) {
      arcPath.dispatchEvent(event);
    }
  }

  mouseleave(index): void {
    const event = new MouseEvent('mouseleave', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    const arcPath = this.getMatchingArcPath(index);
    if (arcPath) {
      arcPath.dispatchEvent(event);
    }
  }
}
