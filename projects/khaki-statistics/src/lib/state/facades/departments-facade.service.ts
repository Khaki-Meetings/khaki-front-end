import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import { departmentsListSelector } from '../statistics.selectors';
import { DepartmentsListSm } from '../models/departments-list-sm';
import { loadDepartmentsListAction } from '../actions/departments-list.actions';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  dispatchDepartmentsList(): void {
    this.store.dispatch(loadDepartmentsListAction());
  }

  selectDepartmentsList(): Observable<DepartmentsListSm> {
    console.log("selectDepartmentsList ",
      this.store.select(departmentsListSelector));
    return this.store.select(departmentsListSelector);
  }

}
