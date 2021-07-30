import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import { setDepartmentsTablePageablesAction } from './departments-table-pageable.actions';
import { DepartmentsTablePageableSm } from './departments-table-pageable.reducer';
import { selectDepartmentsTablePageableState } from './departments-table-pageable.selectors';
import { KhakiSettingsFeatureSm } from '../khaki-settings-feature-sm';
import { HistorianService, Logging } from '@natr/historian';

@Logging
@Injectable({providedIn: 'root'})
export class DepartmentsTablePageableFacade {

  private logger: HistorianService;
  
  constructor(private store: Store<KhakiSettingsFeatureSm>) {
  }

  public dispatchSetDepartmentsTablePageables(page: number, count: number, sortColumn?: string, sortDirection?: SortDirection): void {
    this.logger.debug('dispatchSetDepartmentsTablePageables');
    this.store.dispatch(setDepartmentsTablePageablesAction({page, count, sortColumn, sortDirection}));
  }

  public selectDepartmentsTablePageable(): Observable<DepartmentsTablePageableSm> {
    return this.store.select(selectDepartmentsTablePageableState);
  }
}
