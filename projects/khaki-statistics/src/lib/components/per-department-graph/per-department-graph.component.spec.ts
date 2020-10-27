import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDepartmentGraphComponent } from './per-department-graph.component';import {PerDepartmentStatisticsFacadeService} from "../../state/facades/per-department-statistics-facade.service";
import {By} from "@angular/platform-browser";
import {MatSpinner} from "@angular/material/progress-spinner";

describe('PerDepartmentGraphComponent', () => {
  let component: PerDepartmentGraphComponent;
  let fixture: ComponentFixture<PerDepartmentGraphComponent>;
  let mockPerDepartmentStatisticsService: Partial<PerDepartmentStatisticsFacadeService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerDepartmentGraphComponent ],
      imports: [],
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

  // it(
  //   'should contain ngrx-charts-pie-chart',
  //   () => {
  //     const ngrxPieChartElement = fixture.debugElement.query(By.directive());
  //     expect(ngrxPieChartElement).toBeTruthy('Ngrx pie chart required on this page');
  //   }
  // );
});
