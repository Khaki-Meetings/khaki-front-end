import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';
import {statisticsDepartmentSelector} from '../statistics-filters/statistics-filters.selectors';
import { DepartmentSm } from '../models/department-sm';
import { setCurrentDepartmentAction } from '../actions/current-departments.action';

@Logging
@Injectable({providedIn: 'root'})
export class CurrentDepartmentFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  setCurrentDepartment(department: DepartmentSm): void {
    this.store.dispatch(setCurrentDepartmentAction({department}));
  }

  currentDepartment(): Observable<DepartmentSm> {
    return this.store.pipe(select(statisticsDepartmentSelector));
  }
}
