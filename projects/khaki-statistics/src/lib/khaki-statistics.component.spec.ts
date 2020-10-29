import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KhakiStatisticsComponent} from './khaki-statistics.component';
import {SpinnerFacadeService} from './state/facades/spinner-facade.service';
import {Observable, Subject, Subscriber} from 'rxjs';
import {By} from '@angular/platform-browser';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {PerDepartmentGraphComponent} from './components/per-department-graph/per-department-graph.component';
import {OrganizersTableComponent} from './components/organizers-table/organizers-table.component';
import {TwelveMonthTrailingGraphComponent} from './components/twelve-month-trailing-graph/twelve-month-trailing-graph.component';
import {TimeBasedStatSummaryComponent} from './components/time-based-stat-summary/time-based-stat-summary.component';

describe('KhakiStatisticsComponent', () => {
  let component: KhakiStatisticsComponent;
  let fixture: ComponentFixture<KhakiStatisticsComponent>;
  let mockSpinnerService: Partial<SpinnerFacadeService>;

  let spinnerSubject: Subject<boolean>;

  beforeEach(async () => {
    spinnerSubject = new Subject<boolean>();

    mockSpinnerService = new SpinnerFacadeService();
    spyOn(mockSpinnerService, 'spinner').and.returnValue(spinnerSubject);

    await TestBed.configureTestingModule({
      declarations: [KhakiStatisticsComponent],
      imports: [
        MatProgressSpinnerModule
      ],
      providers: [
        {provide: SpinnerFacadeService, useValue: mockSpinnerService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should change isSpinning based on subscription',
    () => {
      const msg = 'isSpinning should have been set to';
      let valueShouldBe = true;
      // the 'Subscriber' part of the Subject
      spinnerSubject.next(valueShouldBe);
      expect(component.isSpinning).toBe(valueShouldBe, `${msg} ${valueShouldBe}`);
      valueShouldBe = false;
      spinnerSubject.next(valueShouldBe);
      expect(component.isSpinning).toBe(valueShouldBe, `${msg} ${valueShouldBe}`);
    }
  );

  it(
    'should contain spinner',
    () => {
      const spinnerElement = fixture.debugElement.query(By.directive(MatSpinner));
      expect(spinnerElement).toBeTruthy('Spinner required on this page');
    }
  );

  it(
    'should contain PerDepartmentGraph',
    () => {
      const spinnerElement = fixture.debugElement.query(By.directive(PerDepartmentGraphComponent));
      expect(spinnerElement).toBeTruthy('Spinner required on this page');
    }
  );

  it(
    'should contain OrganizersTable',
    () => {
      const spinnerElement = fixture.debugElement.query(By.directive(OrganizersTableComponent));
      expect(spinnerElement).toBeTruthy('Spinner required on this page');
    }
  );

  it(
    'should contain TwelveMonthTrailingGraph',
    () => {
      const spinnerElement = fixture.debugElement.query(By.directive(TwelveMonthTrailingGraphComponent));
      expect(spinnerElement).toBeTruthy('TwelveMonthTrailingGraph required on this page');
    }
  );

  it(
    'should contain TimeBasedStatSummaryComponent',
    () => {
      const spinnerElement = fixture.debugElement.query(By.directive(TimeBasedStatSummaryComponent));
      expect(spinnerElement).toBeTruthy('TimeBasedStatSummaryComponent required on this page');
    }
  );
});
