import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedStatSummaryComponent } from './time-based-stat-summary.component';
import {SinceTimeBlockSummariesFacadeService} from "../../state/facades/since-time-block-summaries-facade.service";

describe('TimeBasedStatSummaryComponent', () => {
  let component: TimeBasedStatSummaryComponent;
  let fixture: ComponentFixture<TimeBasedStatSummaryComponent>;
  let mockSinceTimeBlockSummariesService: Partial<SinceTimeBlockSummariesFacadeService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedStatSummaryComponent ],
      imports: [],
      providers: [
        {provide: SinceTimeBlockSummariesFacadeService, useValue: mockSinceTimeBlockSummariesService}
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
