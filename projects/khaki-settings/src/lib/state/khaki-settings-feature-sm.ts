import {EmployeesResponseDto} from '../services/models/employeesResponseDto';
import {userProfileAttributeKey} from './reducers/user-profile.reducer';
import {employeesAttributeKey} from './reducers/employees.reducer';
import {UserProfileResponseDto} from '../services/models/userProfileResponseDto';
import {departmentsAttributeKey} from './reducers/departments.reducer';
import {DepartmentsResponseDto, DepartmentsResponsePageableDto} from '../services/models/departmentsResponseDto';
import {statisticsFiltersAttributeKey} from './statistics-filters/statistics-filters.reducer';
import {StatisticsFiltersSm} from './statistics-filters/statistics-filters-sm';
import { employeesTablePageableAttributeKey, EmployeesTablePageableSm } from './employees-table-pageable/employees-table-pageable.reducer';
import { departmentsTableAttributeKey, departmentsTablePageableAttributeKey, DepartmentsTablePageableSm } from './departments-table-pageable/departments-table-pageable.reducer';

export interface KhakiSettingsFeatureSm {
  [userProfileAttributeKey]: UserProfileResponseDto;
  [employeesAttributeKey]: EmployeesResponseDto;
  [departmentsAttributeKey]: DepartmentsResponseDto;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
  [employeesTablePageableAttributeKey]: EmployeesTablePageableSm;
  [departmentsTablePageableAttributeKey]: DepartmentsTablePageableSm;
  [departmentsTableAttributeKey]: DepartmentsResponsePageableDto;
}
