import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrailingStatisticsGraphComponent} from './trailing-statistics-graph.component';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {By} from '@angular/platform-browser';
import {BarVerticalComponent, NgxChartsModule} from '@swimlane/ngx-charts';
import {of} from 'rxjs';
import {testTwelveMonthTrailingData} from './test-data.spec';
import {delay} from 'rxjs/operators';

describe('TwelveMonthTrailingGraphComponent', () => {
  let component: TrailingStatisticsGraphComponent;
  let fixture: ComponentFixture<TrailingStatisticsGraphComponent>;
  let mockTrailingStatisticsService: Partial<TrailingStatisticsFacadeService>;

  beforeEach(async () => {
    mockTrailingStatisticsService = {};

    spyOn(mockTrailingStatisticsService, 'requestTrailingStatistics');
    spyOn(mockTrailingStatisticsService, 'trailingStatistics')
      .and
      .returnValue(
        of(testTwelveMonthTrailingData).pipe(delay(100))
      );

    await TestBed.configureTestingModule({
      declarations: [TrailingStatisticsGraphComponent],
      imports: [NgxChartsModule],
      providers: [
        {provide: TrailingStatisticsFacadeService, useValue: mockTrailingStatisticsService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailingStatisticsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should contain ngx-charts-bar-vertical',
    () => {
      const ngxChartBarVertElement = fixture.debugElement.query(By.directive(BarVerticalComponent));
      expect(ngxChartBarVertElement).toBeTruthy('ngx chart bar vertical element required on this page');
    }
  );

  it(
    'should call requestTrailingStatistics once',
    () => {
      expect(mockTrailingStatisticsService.requestTrailingStatistics).toHaveBeenCalledTimes(1);
    }
  );
});
