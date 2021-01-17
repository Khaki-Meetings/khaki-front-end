import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {loadDepartments} from '../actions/departments.actions';
import {departmentsSelector} from '../settings.selectors';
import { SettingsService } from '../../services/settings.service';
import { DepartmentsResponseDto } from '../../services/models/departmentsResponseDto';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsFacadeService {

  constructor(private store: Store<KhakiSettingsFeatureSm>, private service: SettingsService) {
  }

  requestDepartments(): void {
    this.store.dispatch(loadDepartments());
  }

  departments(): Observable<DepartmentsResponseDto> {
    return this.store.select(departmentsSelector);
  }
}
