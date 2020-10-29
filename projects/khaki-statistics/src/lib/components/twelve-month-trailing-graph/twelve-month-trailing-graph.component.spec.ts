import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwelveMonthTrailingGraphComponent} from './twelve-month-trailing-graph.component';
import {TrailingStatisticsFacadeService} from '../../state/facades/trailing-statistics-facade.service';
import {By} from '@angular/platform-browser';
import {BarVerticalComponent, NgxChartsModule} from '@swimlane/ngx-charts';
import {TimeBlockEnum} from '../../state/models/time-block.enum';
import {Observable, Subject} from 'rxjs';

describe('TwelveMonthTrailingGraphComponent', () => {
  let component: TwelveMonthTrailingGraphComponent;
  let fixture: ComponentFixture<TwelveMonthTrailingGraphComponent>;
  let mockTrailingStatisticsService: Partial<TrailingStatisticsFacadeService>;

  beforeEach(async () => {
    mockTrailingStatisticsService = new TrailingStatisticsFacadeService();

    spyOn(mockTrailingStatisticsService, 'requestTrailingStatistics');

    await TestBed.configureTestingModule({
      declarations: [TwelveMonthTrailingGraphComponent],
      imports: [NgxChartsModule],
      providers: [
        {provide: TrailingStatisticsFacadeService, useValue: mockTrailingStatisticsService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwelveMonthTrailingGraphComponent);
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
