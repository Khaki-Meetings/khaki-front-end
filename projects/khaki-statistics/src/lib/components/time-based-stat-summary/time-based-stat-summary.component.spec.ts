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
  let mockTimeBlockSummariesService: Partial<TimeBlockSummariesFacadeService>;

  beforeEach(async () => {
    mockTimeBlockSummariesService = {
      requestTimeBlockSummary(): void {
      },
      timeBlockSummary(): Observable<TimeBlockSummarySm> {
        return of(timeBlockSummaryData).pipe(delay(50));
      }
    };
    spyOn(mockTimeBlockSummariesService, 'requestTimeBlockSummary');
    spyOn(mockTimeBlockSummariesService, 'timeBlockSummary').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [TimeBasedStatSummaryComponent],
      imports: [],
      providers: [
        {provide: TimeBlockSummariesFacadeService, useValue: mockTimeBlockSummariesService}
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
      expect(mockTimeBlockSummariesService.requestTimeBlockSummary).toHaveBeenCalledTimes(1);
    }
  );

  it(
    'should set timeBlockSummaries to data from service observable',
    fakeAsync(
      () => {
        component.ngOnInit();
        expect(component.timeBlockSummary).toBeUndefined('timeBlockSummaries should not be set yet');
        tick(50);
        tick(50);
        fixture.detectChanges();
        expect(component.timeBlockSummary).toEqual(timeBlockSummaryData);
      }
    )
  );
});
