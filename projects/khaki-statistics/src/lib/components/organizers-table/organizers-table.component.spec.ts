import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {OrganizersTableComponent} from './organizers-table.component';
import {MatTableModule} from '@angular/material/table';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {Observable, of} from 'rxjs';
import {testOrganizersStatisticsData} from './test-data.spec';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {delay} from 'rxjs/operators';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {OrganizersTablePageableFacade} from '../../state/organizers-table-pageable/organizers-table-pageable-facade.service';
import {IntervalTextDetailPipe} from '../../pipes/interval-text-detail.pipe';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Pipe, PipeTransform} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Pipe({name: 'intervalTextDetail'})
class MockPipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
    return 'hi';
  }
}

describe('OrganizersTableComponent', () => {
  let component: OrganizersTableComponent;
  let fixture: ComponentFixture<OrganizersTableComponent>;
  let mockOrganizersStatisticsService: Partial<OrganizersStatisticsFacadeService>;
  let mockStatisticsFilterFacade: Partial<StatisticsFiltersFacade>;
  let mockOrganizersTablePageableFacade: Partial<OrganizersTablePageableFacade>;


  beforeEach(async () => {
    mockOrganizersStatisticsService = {
      requestOrganizersStatistics(): void {
      },
      organizersStatistics(): Observable<OrganizersStatisticsSm> {
        return null;
      }
    };
    mockStatisticsFilterFacade = {};
    mockOrganizersTablePageableFacade = {};
    spyOn(mockOrganizersStatisticsService, 'requestOrganizersStatistics');
    spyOn(mockOrganizersStatisticsService, 'organizersStatistics')
      .and
      .returnValue(
        of(testOrganizersStatisticsData)
          .pipe(delay(100))
      );
    await TestBed.configureTestingModule({
      declarations: [OrganizersTableComponent, MockPipe],
      imports: [MatTableModule, MatIconModule, MatPaginatorModule, NoopAnimationsModule],
      providers: [
        {provide: OrganizersStatisticsFacadeService, useValue: mockOrganizersStatisticsService},
        {provide: StatisticsFiltersFacade, useValue: mockStatisticsFilterFacade},
        {provide: OrganizersTablePageableFacade, useValue: mockOrganizersTablePageableFacade}
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
