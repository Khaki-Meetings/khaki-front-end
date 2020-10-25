import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDepartmentGraphComponent } from './per-department-graph.component';
import {StatisticsServiceService} from "../../services/statistics-service.service";

describe('PerDepartmentGraphComponent', () => {
  let component: PerDepartmentGraphComponent;
  let fixture: ComponentFixture<PerDepartmentGraphComponent>;
  let mockStatService: Partial<StatisticsServiceService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerDepartmentGraphComponent ],
      imports: [],
      providers: [
        {provide: StatisticsServiceService, useValue: mockStatService}

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
