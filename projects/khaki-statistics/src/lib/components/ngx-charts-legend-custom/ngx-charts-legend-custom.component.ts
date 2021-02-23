import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {formatLabel, LegendComponent} from '@swimlane/ngx-charts';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-charts-legend-custom',
  templateUrl: './ngx-charts-legend-custom.component.html',
  styleUrls: ['./ngx-charts-legend-custom.component.css']
})

export class NgxChartsLegendCustomComponent extends LegendComponent implements AfterViewInit, OnInit {

  @Input() dataExt: any;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    d3.select('g.pie-chart.chart').append('text')
      .attr('text-anchor', 'middle')
      .attr('stroke', 'white')
      .attr('stroke-width', '0.2em')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'sans-serif')
      .attr('y', 5)
      .attr('id', 'center-text-value-bg')
      .text('');

    d3.select('g.pie-chart.chart').append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', '500')
      .attr('font-family', 'sans-serif')
      .attr('y', 5)
      .attr('id', 'center-text-value')
      .text('');

    d3.select('g.pie-chart.chart').append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-family', 'sans-serif')
      .attr('y', 28)
      .attr('id', 'center-text-label')
      .text('');

    const event = new CustomEvent('pieChartReady', {});
    window.dispatchEvent(event);

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

  getMatchingArcPath(fillColor): Element {
    const arcElement = document.querySelectorAll('[ng-reflect-fill="' + fillColor + '"]');
    const matchingArcPath = arcElement[0].querySelector('.arc');
    return matchingArcPath;
  }

  mouseenter(data): void {
    const event = new MouseEvent('mouseenter', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    const arcPath = this.getMatchingArcPath(data.color);
    arcPath.dispatchEvent(event);
  }

  mouseleave(data): void {
    const event = new MouseEvent('mouseleave', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    const arcPath = this.getMatchingArcPath(data.color);
    arcPath.dispatchEvent(event);
  }
}
