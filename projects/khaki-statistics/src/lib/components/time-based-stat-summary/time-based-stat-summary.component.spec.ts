import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedStatSummaryComponent } from './time-based-stat-summary.component';
import {SinceTimeBlockSummariesService} from "../../state/facades/since-time-block-summaries.service";

describe('TimeBasedStatSummaryComponent', () => {
  let component: TimeBasedStatSummaryComponent;
  let fixture: ComponentFixture<TimeBasedStatSummaryComponent>;
  let mockSinceTimeBlockSummariesService: Partial<SinceTimeBlockSummariesService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedStatSummaryComponent ],
      imports: [],
      providers: [
        {provide: SinceTimeBlockSummariesService, useValue: mockSinceTimeBlockSummariesService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedStatSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
