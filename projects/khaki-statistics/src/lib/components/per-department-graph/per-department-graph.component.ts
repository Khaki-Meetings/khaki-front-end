import {Component, HostListener, OnInit} from '@angular/core';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {ColorHelper} from '@swimlane/ngx-charts';
import {HistorianService, Logging} from '@natr/historian';
import {Utilities} from '../../services/utilities';
import {IntervalEnum} from '../../services/models/interval.enum';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {StatisticsFiltersSm} from '../../state/statistics-filters/statistics-filters-sm';

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

  intervalText: string;
  meetingTypeText: string;
  loading = false;

  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService,
              private statisticsFiltersFacadeService: StatisticsFiltersFacade) {
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

    this.statisticsFiltersFacadeService.statisticsFilters()
      .subscribe((data) => {
        const statsFilter = data as StatisticsFiltersSm;
        const timeBlockRange = {start: statsFilter.start, end: statsFilter.end};
        this.intervalText =
          Utilities.formatIntervalTextDetail(IntervalEnum[statsFilter.interval], timeBlockRange);
        this.meetingTypeText = Utilities.formatMeetingTypeDetail(statsFilter.statisticsScope);
      });

    this.perDepartmentStatisticsFacade.perDepartmentStatisticsLoading().subscribe(loading => this.loading = loading);
  }

  private createGraphData(): void {
    this.graphData = this.perDepartmentStatistics.departmentsStatistics.map(
      el => {
        return {
          name: el.department,
          value: el.totalSeconds
        };
      }
    );
  }

  public legendLabelActivate(event: any, item: any): void {
    const dataElement = this.chartData.find(x => x.extra.displayName === event.name);

    const d = {
      entries: [{
        name: dataElement.name,
        value: Utilities.formatHrsMins(dataElement.value),
        label: dataElement.name
      }],
      value: {
        name: dataElement.name,
        value: Utilities.formatHrsMins(dataElement.value),
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
      displayValue = Utilities.formatHrsMins(data.value.value);
    }
    // document.getElementById('center-text-label').innerHTML = data.value.name;
    // document.getElementById('center-text-value-bg').innerHTML = displayValue;
    // document.getElementById('center-text-value').innerHTML = displayValue;
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
      const displayValue = Utilities.formatHrsMins(val);
      document.getElementById('center-text-value-bg').innerHTML = displayValue;
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
      return [200, 200];
    }
    const dimensionSize = this.graphData.length * 25;
    return [dimensionSize, dimensionSize];
  }
}
