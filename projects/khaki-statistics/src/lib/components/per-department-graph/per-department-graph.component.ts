import {Component, HostListener, OnInit} from '@angular/core';
import {DepartmentsStatisticsSm} from '../../state/models/departments-statistics-sm';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {ColorHelper} from '@swimlane/ngx-charts';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';

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
  constructor(private perDepartmentStatisticsFacade: PerDepartmentStatisticsFacadeService,
              private statisticsFiltersFacadeService: StatisticsFiltersFacade) {
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

    this.statisticsFiltersFacadeService.selectStatisticsFilters()
      .subscribe((statisticsFilters) => {
        this.interval = statisticsFilters.interval;
        this.start = statisticsFilters.start;
        this.end = statisticsFilters.end;
        this.statisticsScope = statisticsFilters.statisticsScope;
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

  public legendLabelDeactivate(item: any): void {
    this.drawDefaultDonutLabel();
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
      const displayValue = PerDepartmentGraphComponent.formatHrsMins(val);
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
