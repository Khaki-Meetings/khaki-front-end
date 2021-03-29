import {Component, Renderer2, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {ColorHelper} from '@swimlane/ngx-charts';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import * as d3 from 'd3';

interface GraphData {
  name: string;
  value: number;
}

@Logging
@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PerDepartmentGraphComponent implements OnInit {
  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService,
              private statisticsFiltersFacadeService: StatisticsFiltersFacade,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  private logger: HistorianService;

  perDepartmentStatistics: DepartmentsStatisticsSm;

  view: any[] = [175, 175];

  // options
  showLegend = false;
  gradient = true;
  showLabels = false;
  isDoughnut = true;
  tooltipDisabled = true;
  arcWidth = 0.2;

  colorScheme = {
    domain: ['#3182CE', '#48BB78', '#9F7AEA', '#ED64A6', '#667EEA', '#478aef', '#47ef88', '#b647ef', '#ef47ba', '#e3b755']
  };

  chartData: any[] = [];
  graphData: GraphData[] = [];
  legendData: any[] = [];
  colors: ColorHelper = new ColorHelper('cool', 'ordinal', [], null);

  interval: IntervalSe;
  start: Moment;
  end: Moment;
  statisticsScope: StatisticsScopeSe;
  loading = false;

  private static formatHrsMins(seconds: number): string {

    const hours = Math.trunc(seconds / 60 / 60);
    const minutes = Math.trunc(seconds / 60 % 60);

    let hoursLabel = 'hrs';
    if (hours === 1) {
      hoursLabel = 'hr';
    }

    const minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }

  ngOnInit(): void { }

  onActivate(data): void { }

  onDeactivate(data): void { }

  public getMatchingArcPath(index): Element { return null; }

  public legendLabelDeactivate(item: any): void { return null; }

  /*

  THIS WILL NEED TO BE UPDATED FOR THE NEW SERVICE W/O INT/EXT
  IF WE EVER DECIDE WE NEED IT AGAIN
  
    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          console.log('data from state', data); // was natr-historian  this.logger.debug
          this.perDepartmentStatistics = data;
          this.createGraphData();

          this.view = this.calculatePieDimensions();
          this.drawDefaultDonutLabel();

          console.log('graph data', this.graphData); // was natr-historian  this.logger.debug
          this.chartData = [];
          this.graphData.forEach(
            departmentData => {
              const newDataPoint = {
                name: departmentData.name,
                value: departmentData.value,
                extra: {
                  displayName: departmentData.name,
                  displayValue: departmentData.value
                }
              };
              this.chartData.push(newDataPoint);
            }
          );

          console.log('chart data', this.chartData); // was natr-historian  this.logger.debug
          this.legendData = this.chartData.map(d => d.extra.displayName);
          this.colors = new ColorHelper(this.colorScheme, 'ordinal', this.legendData, null);
        });

    this.statisticsFiltersFacadeService.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.statisticsScope = statisticsFilters.statisticsScope;
      });

    this.perDepartmentStatisticsFacade.perDepartmentStatisticsLoading().subscribe(loading => this.loading = loading);

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
  }

  private createGraphData(): void {
    this.graphData = this.perDepartmentStatistics.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalSeconds,
          inventorySecondsAvailable: el.inventorySecondsAvailable
        };
      }
    );
  }

  public legendLabelDeactivate(item: any): void {
    this.drawDefaultDonutLabel();
  }

  onActivate(data): void {
    let displayValue = '';
    if (data.value.value !== 0) {
      displayValue = PerDepartmentGraphComponent.formatHrsMins(data.value.value);
    }

    this.renderer.setProperty(this.elementRef.nativeElement.querySelector('#center-text-label'),
        'innerHTML', data.value.name);

    this.renderer.setProperty(this.elementRef.nativeElement.querySelector('#center-text-value'),
        'innerHTML', displayValue);

     const dom: HTMLElement = this.elementRef.nativeElement;
     const elements = dom.querySelectorAll('.ngx-charts .arc:not(.active)');
     elements.forEach((x) => {
       (x as HTMLElement).classList.add('inactive');
     });
  }

  onDeactivate(data): void {
    this.drawDefaultDonutLabel();

    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.ngx-charts .arc');
    elements.forEach((x) => {
      (x as HTMLElement).classList.remove('inactive');
    });
  }

  public drawDefaultDonutLabel(): void {

    const dom: HTMLElement = this.elementRef.nativeElement;

    if (dom.querySelector('#center-text-value') != null &&
        dom.querySelector('#center-text-label') != null) {
      let val = 0;

      for (const x in this.graphData) {
        if (x) {
          val = val + this.graphData[x].value;
        }
      }
      const displayValue = PerDepartmentGraphComponent.formatHrsMins(val);

      this.renderer.setProperty(dom.querySelector('#center-text-value'),
           'innerHTML', displayValue);
      this.renderer.setProperty(dom.querySelector('#center-text-label'),
           'innerHTML', 'in meetings');
    }
  }

  private calculatePieDimensions(): number[] {
    return [350, 350];
  }

  public getMatchingArcPath(index): Element {
    const dom: HTMLElement = this.elementRef.nativeElement;
    return dom.querySelectorAll('path.arc')[index];
  }
  */
}
