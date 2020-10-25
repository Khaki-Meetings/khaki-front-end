import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDepartmentGraphComponent } from './per-department-graph.component';
import {PerDepartmentStatisticsService} from "../../state/facades/per-department-statistics.service";

describe('PerDepartmentGraphComponent', () => {
  let component: PerDepartmentGraphComponent;
  let fixture: ComponentFixture<PerDepartmentGraphComponent>;
  let mockPerDepartmentStatisticsService: Partial<PerDepartmentStatisticsService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerDepartmentGraphComponent ],
      imports: [],
      providers: [
        {provide: PerDepartmentStatisticsService, useValue: mockPerDepartmentStatisticsService}

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
});
