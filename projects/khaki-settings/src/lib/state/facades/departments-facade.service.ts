import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {loadDepartments} from '../actions/departments.actions';
import {departmentsPageableLoadingSelector, departmentsPageableSelector, departmentsSelector} from '../settings.selectors';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsResponseDto, DepartmentsResponsePageableDto } from '../../services/models/departmentsResponseDto';
import { loadDepartmentsPageable } from '../actions/departments-pageable.actions';
import { HistorianService, Logging } from '@natr/historian';

@Logging
@Injectable({
  providedIn: 'root'
})
export class DepartmentsFacadeService {

  private logger: HistorianService;

  constructor(private store: Store<KhakiSettingsFeatureSm>, private service: SettingsService) {
  }

  requestDepartments(): void {
    this.store.dispatch(loadDepartments());
  }

  departments(): Observable<DepartmentsResponseDto> {
    return this.store.select(departmentsSelector);
  }

  requestDepartmentsPageable(): void {
    this.logger.debug("requestDepartmentsPageable");
    this.store.dispatch(loadDepartmentsPageable());
  }

  departmentsPageable():  Observable<DepartmentsResponsePageableDto> {
    return this.store.select(departmentsPageableSelector);
  }

  selectDepartmentsPageableLoading(): Observable<boolean> {
    return this.store.select(departmentsPageableLoadingSelector);
  }
}
