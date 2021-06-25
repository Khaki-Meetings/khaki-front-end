import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {loadEmployees} from '../actions/employees.actions';
import {employeesLoadingSelector, employeesSelector} from '../settings.selectors';
import { SettingsService } from '../../services/settings.service';
import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeesFacadeService {

  constructor(private store: Store<KhakiSettingsFeatureSm>, private service: SettingsService) {
  }

  requestEmployees(): void {
    this.store.dispatch(loadEmployees());
  }

  employees(): Observable<EmployeesResponseDto> {
    return this.store.select(employeesSelector);
  }

  selectEmployeesLoading(): Observable<boolean> {
    return this.store.select(employeesLoadingSelector);
  }

}
