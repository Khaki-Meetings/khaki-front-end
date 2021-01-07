import {DepartmentSm} from './department-sm';

export interface DepartmentStatisticsSm {
  department: string;
  totalSeconds?: number;
  totalCost?: number;
  averageCost?: number;
}
