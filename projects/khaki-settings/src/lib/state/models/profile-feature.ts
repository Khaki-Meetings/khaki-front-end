import { EmployeesResponseDto } from '../../services/models/employeesResponseDto';
import { userProfileAttributeKey } from '../reducers/user-profile.reducer';
import { employeesAttributeKey } from '../reducers/employees.reducer';
import { UserProfileResponseDto } from '../../services/models/userProfileResponseDto';
import { departmentsAttributeKey } from '../reducers/departments.reducer';
import { DepartmentsResponseDto } from '../../services/models/departmentsResponseDto';

export interface ProfileFeature {
  [userProfileAttributeKey]: UserProfileResponseDto;
  [employeesAttributeKey]: EmployeesResponseDto;
  [departmentsAttributeKey]: DepartmentsResponseDto;
}
