import {Component, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {ColorHelper} from '@swimlane/ngx-charts';
import {NgxChartsLegendCustomComponent} from '../ngx-charts-legend-custom/ngx-charts-legend-custom.component';
import {HistorianService, Logging} from '@natr/historian';

interface GraphData {
  name: string;
  value: number;
}

@Logging
@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})

export class PerDepartmentGraphComponent implements OnInit {
  private logger: HistorianService;

  perDepartmentStatistics: DepartmentsStatisticsSm;

  view: any[] = [175, 175];

  // options
  showLegend = false;
  gradient = true;
  showLabels = false;
  isDoughnut = true;
  tooltipDisabled = true;

  colorScheme = {
    domain: ['#3182CE', '#48BB78', '#9F7AEA', '#ED64A6', '#667EEA', '#478aef', '#47ef88', '#b647ef', '#ef47ba', '#e3b755']
  };

  chartData: any[] = [];
  graphData: GraphData[] = [];
  legendData: any[] = [];
  colors: ColorHelper = new ColorHelper('cool', 'ordinal', [], null);

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService) {

  }

  ngOnInit(): void {
    this.perDepartmentStatisticsFacade
      .perDepartmentStatistics()
      .subscribe(
        (data) => {
          this.logger.debug('data from state', data);
          this.perDepartmentStatistics = data;
          this.createGraphData();

          this.view = this.calculatePieDimensions();
          this.drawDefaultDonutLabel();

          this.logger.debug('graph data', this.graphData);
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

          this.logger.debug('chart data', this.chartData);

          this.legendData = this.chartData.map(d => d.extra.displayName);
          this.colors = new ColorHelper(this.colorScheme, 'ordinal', this.legendData, null);
        });
  }

  private createGraphData(): void {
    this.graphData = this.perDepartmentStatistics.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalHours
        };
      }
    );
  }

  public legendLabelActivate(event: any, item: any): void {
    const dataElement = this.chartData.find(x => x.extra.displayName === event.name);

    const d = {
      entries: [{
        name: dataElement.name,
        value: dataElement.value,
        label: dataElement.name
      }],
      value: {
        name: dataElement.name,
        value: dataElement.value,
        label: dataElement.name
      }
    };
    this.onActivate(d);
  }

  public legendLabelDeactivate(item: any): void {
    this.drawDefaultDonutLabel();
  }

  onActivate(data): void {
    let displayValue = '';
    if (data.value.value !== 0) {
      displayValue = Math.trunc(data.value.value) + ' hrs';
    }
    document.getElementById('center-text-label').innerHTML = data.value.name;
    document.getElementById('center-text-value').innerHTML = displayValue;
  }

  onDeactivate(data): void {
    this.drawDefaultDonutLabel();
  }

  public drawDefaultDonutLabel(): void {
    if (document.getElementById('center-text-label') != null) {
      let val = 0;

      for (const x in this.graphData) {
        if (x) {
          val = val + this.graphData[x].value;
        }
      }
      const displayValue = Math.trunc(val) + ' hrs';
      document.getElementById('center-text-value').innerHTML = displayValue;
      document.getElementById('center-text-label').innerHTML = 'in meetings';
    }
  }

  @HostListener('window:pieChartReady', ['$event.detail'])
  pieChartReady(): void {
    this.drawDefaultDonutLabel();
  }

  private calculatePieDimensions(): number[] {
    if (this.graphData === null || this.graphData.length < 4) {
      return [175, 175];
    }
    const dimensionSize = this.graphData.length * 40;
    return [dimensionSize, dimensionSize];
  }
}
