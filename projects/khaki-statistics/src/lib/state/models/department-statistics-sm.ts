import {DepartmentSm} from './departmentSm';

export interface DepartmentStatisticsSm {
  department: string;
  totalHours?: number;
  totalCost?: number;
  averageCost?: number;
}
