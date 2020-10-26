import {Department} from './department';

export interface DepartmentStatistics {
  department: Department;
  totalHours?: number;
  totalCost?: number;
  averageCost?: number;
}
