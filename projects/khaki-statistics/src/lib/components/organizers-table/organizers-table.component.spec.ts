import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {OrganizersTableComponent} from './organizers-table.component';
import {By} from '@angular/platform-browser';
import {MatTable, MatTableModule} from '@angular/material/table';
import {Observable, of} from 'rxjs';
import {testOrganizersAggregateStatisticsData} from './test-data.spec';
import {delay} from 'rxjs/operators';
import { OrganizersAggregateStatisticsFacadeService } from '../../state/facades/organizers-aggregate-statistics-facade.service';
import { OrganizersAggregateStatisticsSm } from '../../state/models/organizers-aggregate-statistics-sm';

describe('OrganizersTableComponent', () => {
  let component: OrganizersTableComponent;
  let fixture: ComponentFixture<OrganizersTableComponent>;
  let mockOrganizersStatisticsService: Partial<OrganizersAggregateStatisticsFacadeService>;


  beforeEach(async () => {
    mockOrganizersStatisticsService = {
      dispatchLoadOrganizersAggregateStatistics(): void {
      },
      selectOrganizersAggregateStatistics(): Observable<OrganizersAggregateStatisticsSm> {
        return null;
      }
    };
    spyOn(mockOrganizersStatisticsService, 'selectOrganizersAggregateStatistics')
      .and
      .returnValue(
        of(testOrganizersAggregateStatisticsData)
          .pipe(delay(100))
      );
    await TestBed.configureTestingModule({
      declarations: [OrganizersTableComponent],
      imports: [MatTableModule],
      providers: [
        {provide: OrganizersAggregateStatisticsFacadeService, useValue: mockOrganizersStatisticsService}

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should contain mat table',
    () => {
      const matTableElement = fixture.debugElement.query(By.directive(MatTable));
      expect(matTableElement).toBeTruthy('Mat Table required on this page');
    }
  );


  it(
    'should set twelveMonthTrailingStatistics to data from service observable',
    fakeAsync(
      () => {
        expect(component.organizersStatistics).toBeUndefined('organizersStatistics should not be set yet');
        tick(100);
        expect(component.organizersStatistics).toEqual(testOrganizersAggregateStatisticsData);
      }
    )
  );
});
