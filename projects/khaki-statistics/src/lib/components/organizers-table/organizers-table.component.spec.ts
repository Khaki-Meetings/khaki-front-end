import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {OrganizersTableComponent} from './organizers-table.component';
import {By} from '@angular/platform-browser';
import {MatTable, MatTableModule} from '@angular/material/table';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {Observable, of} from 'rxjs';
import {testOrganizersStatisticsData} from './test-data.spec';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {delay} from 'rxjs/operators';

describe('OrganizersTableComponent', () => {
  let component: OrganizersTableComponent;
  let fixture: ComponentFixture<OrganizersTableComponent>;
  let mockOrganizersStatisticsService: Partial<OrganizersStatisticsFacadeService>;


  beforeEach(async () => {
    mockOrganizersStatisticsService = {
      requestOrganizersStatistics(): void {
      },
      organizersStatistics(): Observable<OrganizersStatisticsSm> {
        return null;
      }
    };
    spyOn(mockOrganizersStatisticsService, 'requestOrganizersStatistics');
    spyOn(mockOrganizersStatisticsService, 'organizersStatistics')
      .and
      .returnValue(
        of(testOrganizersStatisticsData)
          .pipe(delay(100))
      );
    await TestBed.configureTestingModule({
      declarations: [OrganizersTableComponent],
      imports: [MatTableModule],
      providers: [
        {provide: OrganizersStatisticsFacadeService, useValue: mockOrganizersStatisticsService}

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
        expect(component.organizersStatistics).toEqual(testOrganizersStatisticsData);
      }
    )
  );
});
