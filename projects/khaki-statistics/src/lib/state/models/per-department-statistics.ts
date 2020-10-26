import {DepartmentStatistics} from './department-statistics';

export interface PerDepartmentStatistics {
  departmentStatistics: DepartmentStatistics;
  errors: Error[];
}
