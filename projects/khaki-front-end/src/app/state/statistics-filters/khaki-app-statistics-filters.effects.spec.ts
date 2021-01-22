import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { KhakiAppStatisticsFiltersEffects } from './khaki-app-statistics-filters-effects.service';

describe('KhakiAppStatitisticsFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: KhakiAppStatisticsFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KhakiAppStatisticsFiltersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(KhakiAppStatisticsFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
