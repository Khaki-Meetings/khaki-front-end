import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelveMonthTrailingGraphComponent } from './twelve-month-trailing-graph.component';
import {TrailingStatisticsService} from "../../state/facades/trailing-statistics.service";
import {By} from "@angular/platform-browser";
import {MatSpinner} from "@angular/material/progress-spinner";

describe('TwelveMonthTrailingGraphComponent', () => {
  let component: TwelveMonthTrailingGraphComponent;
  let fixture: ComponentFixture<TwelveMonthTrailingGraphComponent>;
  let mockTrailingStatisticsService: Partial<TrailingStatisticsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwelveMonthTrailingGraphComponent ],
      imports: [],
      providers: [
        {provide: TrailingStatisticsService, useValue: mockTrailingStatisticsService}
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

  // it(
  //   'should contain gx-charts-bar-vertical',
  //   () => {
  //     const gxChartBarVertElement = fixture.debugElement.query(By.directive());
  //     expect(gxChartBarVertElement).toBeTruthy('gx chart bar vertical element required on this page');
  //   }
  // );
});
