import {DepartmentSm} from './departmentSm';

export interface DepartmentStatisticsSm {
  department: string;
  totalSeconds?: number;
  totalCost?: number;
  averageCost?: number;
}
