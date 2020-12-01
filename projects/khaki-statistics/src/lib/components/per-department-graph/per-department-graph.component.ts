import {Component, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {ColorHelper} from '@swimlane/ngx-charts';
import {NgxChartsLegendCustomComponent} from '../ngx-charts-legend-custom/ngx-charts-legend-custom.component'
interface GraphData {
  name: string;
  value: number;
}

@Component({
  selector: 'lib-per-department-graph',
  templateUrl: './per-department-graph.component.html',
  styleUrls: ['./per-department-graph.component.scss']
})
export class PerDepartmentGraphComponent {
  perDepartmentStatistics: PerDepartmentStatisticsSm;

  view: any[] = [175, 175];

  // options
  showLegend = false;
  gradient: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = true;

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
          this.perDepartmentStatistics = data;
          this.createGraphData();

          this.view = this.calculatePieDimensions();
          this.drawDefaultDonutLabel();

          for (let d in this.graphData) {
            let name = this.graphData[d].name;
            let val = this.graphData[d].value;
            let newDataPoint = {
              'name': name,
              'value': val,
              'extra': {
                'displayName': name,
                'displayValue': val
              }
            }
            this.chartData.push(newDataPoint);
          }
          this.legendData = this.chartData.map(d => d['extra']['displayName']);
          this.colors = new ColorHelper(this.colorScheme, 'ordinal', this.legendData, null);
        });
  }

  private createGraphData(): void {
    this.graphData = this.perDepartmentStatistics.departmentStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalHours
        };
      }
    );
  }

  public legendLabelActivate(event: any, item: any): void {
    var dataElement = this.chartData.find(x => x.extra.displayName == event.name);

    var d = {
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
    var displayValue = "";
    if (data.value.value != 0) {
      displayValue = Math.floor(data.value.value / 60) + " hrs";
    }
    document.getElementById('center-text-label').innerHTML = data.value.name;
    document.getElementById('center-text-value').innerHTML = displayValue;
  }

  onDeactivate(data): void {
    this.drawDefaultDonutLabel();
  }

  public drawDefaultDonutLabel() {
    if (document.getElementById('center-text-label') != null) {
      var val = 0;
      for (let x in this.graphData) {
        val = val + this.graphData[x].value;
      }
      var displayValue = Math.floor(val / 60) + " hrs";
      document.getElementById('center-text-value').innerHTML = displayValue;
      document.getElementById('center-text-label').innerHTML = "in meetings";
    }
  }

  @HostListener('window:pieChartReady', ['$event.detail'])
  pieChartReady() {
    this.drawDefaultDonutLabel();
  }

  private calculatePieDimensions() {
    if (this.graphData === null || this.graphData.length < 4) {
      return [175, 175];
    }
    const dimensionSize = this.graphData.length * 40;
    return [dimensionSize, dimensionSize];
  }
}
