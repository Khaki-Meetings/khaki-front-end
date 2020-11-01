import {DepartmentSm} from './departmentSm';

export interface DepartmentStatisticsSm {
  department: DepartmentSm;
  totalHours?: number;
  totalCost?: number;
  averageCost?: number;
}
