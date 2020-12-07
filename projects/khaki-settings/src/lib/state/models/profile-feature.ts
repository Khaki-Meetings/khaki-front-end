import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';
import { userProfileFeatureKey } from '../reducers/user-profile.reducer';
import { employeesFeatureKey } from '../reducers/employees.reducer';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { departmentsFeatureKey } from '../reducers/departments.reducer';
import { DepartmentsResponseDto } from '../../services/models/departmentsResponseDto';

export interface ProfileFeature {
  [userProfileFeatureKey]: UserProfileResponseDto;
  [employeesFeatureKey]: EmployeesResponseDto;
  [departmentsFeatureKey]: DepartmentsResponseDto;
}
