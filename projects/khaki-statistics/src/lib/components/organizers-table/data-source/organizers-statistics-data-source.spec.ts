import {TestBed} from '@angular/core/testing';
import {OrganizersStatisticsDataSource} from './organizers-statistics-data-source';
import {provideMockStore} from '@ngrx/store/testing';

describe('OrganizersStatisticsDataSource', () => {
  let underTest: OrganizersStatisticsDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [provideMockStore({initialState: {}})]
      }
    );
    underTest = new OrganizersStatisticsDataSource();
  });

  it('should be created', () => {
    expect(underTest).toBeTruthy();
  });
});
