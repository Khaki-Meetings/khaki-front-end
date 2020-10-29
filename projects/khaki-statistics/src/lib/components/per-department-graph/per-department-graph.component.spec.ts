import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PerDepartmentGraphComponent} from './per-department-graph.component';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {By} from '@angular/platform-browser';
import {NgxChartsModule, PieChartComponent} from '@swimlane/ngx-charts';
import {of} from 'rxjs';
import {testPerDepartmentStatistics} from './test-data.spec';
import {delay} from 'rxjs/operators';
import {timeBlockSummariesData} from '../time-based-stat-summary/test-data.spec';

describe('PerDepartmentGraphComponent', () => {
  let component: PerDepartmentGraphComponent;
  let fixture: ComponentFixture<PerDepartmentGraphComponent>;
  let mockPerDepartmentStatisticsService: Partial<PerDepartmentStatisticsFacadeService>;

  beforeEach(async () => {
    mockPerDepartmentStatisticsService = {
      requestPerDepartmentStatistics: () => {
      },
      perDepartmentStatistics() {
        return of(testPerDepartmentStatistics).pipe(delay(100));
      }
    };
    spyOn(mockPerDepartmentStatisticsService, 'requestPerDepartmentStatistics');
    spyOn(mockPerDepartmentStatisticsService, 'perDepartmentStatistics');
    await TestBed.configureTestingModule({
      declarations: [PerDepartmentGraphComponent],
      imports: [NgxChartsModule],
      providers: [
        {provide: PerDepartmentStatisticsFacadeService, useValue: mockPerDepartmentStatisticsService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerDepartmentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should contain ngrx-charts-pie-chart',
    () => {
      const ngrxPieChartElement = fixture.debugElement.query(By.directive(PieChartComponent));
      expect(ngrxPieChartElement).toBeTruthy('Ngrx pie chart required on this page');
    }
  );

  it(
    'should call \'requestPerDepartmentStatistics\' once',
    () => {
      expect(mockPerDepartmentStatisticsService.requestPerDepartmentStatistics).toHaveBeenCalledTimes(1);
    }
  );

  it(
    'should set perDepartmentStatistics to data from service observable',
    fakeAsync(
      () => {
        expect(component.perDepartmentStatistics).toBeUndefined('sinceTimeBlockSummaries should not be set yet');
        tick(100);
        expect(component.perDepartmentStatistics).toEqual(testPerDepartmentStatistics);
      }
    )
  );
});
