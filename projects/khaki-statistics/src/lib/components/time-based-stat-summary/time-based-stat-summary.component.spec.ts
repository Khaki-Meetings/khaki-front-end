import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TimeBasedStatSummaryComponent} from './time-based-stat-summary.component';
import {TimeBlockSummariesFacadeService} from '../../state/facades/time-block-summaries-facade.service';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {timeBlockSummaryData} from './test-data.spec';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';

describe('TimeBasedStatSummaryComponent', () => {
  let component: TimeBasedStatSummaryComponent;
  let fixture: ComponentFixture<TimeBasedStatSummaryComponent>;
  let mockSinceTimeBlockSummariesService: Partial<TimeBlockSummariesFacadeService>;

  beforeEach(async () => {
    mockSinceTimeBlockSummariesService = {
      requestTimeBlockSummary(): void {
      },
      timeBlockSummary(): Observable<TimeBlockSummarySm> {
        return null;
      }
    };
    spyOn(mockSinceTimeBlockSummariesService, 'requestTimeBlockSummary');
    spyOn(mockSinceTimeBlockSummariesService, 'timeBlockSummary').and.returnValue(of(timeBlockSummaryData).pipe(delay(100)));

    await TestBed.configureTestingModule({
      declarations: [TimeBasedStatSummaryComponent],
      imports: [],
      providers: [
        {provide: TimeBlockSummariesFacadeService, useValue: mockSinceTimeBlockSummariesService}
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
      expect(mockSinceTimeBlockSummariesService.requestTimeBlockSummary).toHaveBeenCalledTimes(1);
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
