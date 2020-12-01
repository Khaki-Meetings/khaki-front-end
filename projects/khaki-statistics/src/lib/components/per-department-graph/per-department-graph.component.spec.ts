import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PerDepartmentGraphComponent} from './per-department-graph.component';
import {NgxChartsLegendCustomComponent} from '../ngx-charts-legend-custom/ngx-charts-legend-custom.component';
import {PerDepartmentStatisticsFacadeService} from '../../state/facades/per-department-statistics-facade.service';
import {BrowserModule, By} from '@angular/platform-browser';
import {NgxChartsModule, PieChartComponent} from '@swimlane/ngx-charts';
import {Observable, of} from 'rxjs';
import {testPerDepartmentStatistics} from './test-data.spec';
import {delay} from 'rxjs/operators';
import {PerDepartmentStatisticsSm} from '../../state/models/per-department-statistics-sm';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PerDepartmentGraphComponent', () => {
  let component: PerDepartmentGraphComponent;
  let fixture: ComponentFixture<PerDepartmentGraphComponent>;
  let mockPerDepartmentStatisticsService: Partial<PerDepartmentStatisticsFacadeService>;

  beforeEach(async () => {
    mockPerDepartmentStatisticsService = {
      requestPerDepartmentStatistics: () => {
      },
      perDepartmentStatistics(): Observable<PerDepartmentStatisticsSm> {
        return of(testPerDepartmentStatistics).pipe(delay(100));
        // return of(testPerDepartmentStatistics);
      }
    };
    spyOn(mockPerDepartmentStatisticsService, 'requestPerDepartmentStatistics');
    spyOn(mockPerDepartmentStatisticsService, 'perDepartmentStatistics')
      .and
      .callThrough();
    await TestBed.configureTestingModule({
      declarations: [PerDepartmentGraphComponent],
      imports: [BrowserModule, NgxChartsModule, NoopAnimationsModule],
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
    'should set perDepartmentStatistics to data from service observable',
    fakeAsync(
      () => {
        component.ngOnInit();
        expect(component.perDepartmentStatistics).toBeUndefined('sinceTimeBlockSummaries should not be set yet');
        tick(100);
        fixture.detectChanges();
        expect(component.perDepartmentStatistics).toEqual(testPerDepartmentStatistics);
      }
    )
  );
});
