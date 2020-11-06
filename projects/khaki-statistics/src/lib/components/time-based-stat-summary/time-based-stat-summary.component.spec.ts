import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TimeBasedStatSummaryComponent} from './time-based-stat-summary.component';
import {SinceTimeBlockSummariesFacadeService} from '../../state/facades/since-time-block-summaries-facade.service';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {timeBlockSummaryData} from './test-data.spec';

describe('TimeBasedStatSummaryComponent', () => {
  let component: TimeBasedStatSummaryComponent;
  let fixture: ComponentFixture<TimeBasedStatSummaryComponent>;
  let mockSinceTimeBlockSummariesService: SinceTimeBlockSummariesFacadeService;

  beforeEach(async () => {
    mockSinceTimeBlockSummariesService = new SinceTimeBlockSummariesFacadeService();
    spyOn(mockSinceTimeBlockSummariesService, 'requestTimeBlockSummaries');
    spyOn(mockSinceTimeBlockSummariesService, 'timeBlockSummaries').and.returnValue(of(timeBlockSummaryData).pipe(delay(100)));

    await TestBed.configureTestingModule({
      declarations: [TimeBasedStatSummaryComponent],
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

  it(
    'should call \'requestTimeBlockSummaries\' once',
    () => {
      expect(mockSinceTimeBlockSummariesService.requestTimeBlockSummaries).toHaveBeenCalledTimes(1);
    }
  );

  it(
    'should set sinceTimeBlockSummaries to data from service observable',
    fakeAsync(
      () => {
        expect(component.timeBlockSummary).toBeUndefined('sinceTimeBlockSummaries should not be set yet');
        tick(100);
        expect(component.timeBlockSummary).toEqual(timeBlockSummaryData);
      }
    )
  );
});
