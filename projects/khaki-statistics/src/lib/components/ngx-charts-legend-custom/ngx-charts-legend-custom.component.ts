import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { LegendComponent, formatLabel } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

@Component({
  selector: 'ngx-charts-legend-custom',
  template: `
      <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <table class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <tr ngx-charts-legend-entry-custom *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label"
              [label]="entry.label"
              [dataExt]="entry.dataExt"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
              (mouseenter)="mouseenter(entry)"
              (mouseleave)="mouseleave(entry)">
          </tr>
        </table>
      </div>
    </div>`,
    styleUrls: ['./ngx-charts-legend-custom.component.css']
})

export class NgxChartsLegendCustomComponent extends LegendComponent {

  @Input() dataExt: any;

  constructor(cd: ChangeDetectorRef) { super(cd); }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    d3.select('g.pie-chart.chart').append("text")
      .attr("text-anchor", "middle")
      .attr('font-size', '16px')
      .attr("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .attr('y', 5)
      .attr('id', 'center-text-value')
      .text('');

    d3.select('g.pie-chart.chart').append("text")
      .attr("text-anchor", "middle")
      .attr('font-size', '10px')
      .attr("font-family", "sans-serif")
      .attr('y', 18)
      .attr('id', 'center-text-label')
      .text('');

    var event = new CustomEvent('pieChartReady', {})
      window.dispatchEvent(event);

  }

  getLegendEntries(): any[] {
    const items = [];
    for (const label of this.data) {
      const dataExt = this.dataExt.find(x => x.name == label);
      const formattedLabel = formatLabel(label);
      const idx = items.findIndex(i => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          dataExt,
          color: this.colors.getColor(label)
        });
      }
    }
    return items;
  }

  getMatchingArcPath(fillColor) {
    var arcElement = document.querySelectorAll('[ng-reflect-fill="' + fillColor + '"]');
    var matchingArcPath = arcElement[0].querySelector('.arc');
    return matchingArcPath;
  }

  mouseenter(data) {
    var event = new MouseEvent('mouseenter', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });

    var arcPath = this.getMatchingArcPath(data.color);
    arcPath.dispatchEvent(event);
  }

  mouseleave(data) {
    var event = new MouseEvent('mouseleave', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });

    var arcPath = this.getMatchingArcPath(data.color);
    arcPath.dispatchEvent(event);
  }
}
