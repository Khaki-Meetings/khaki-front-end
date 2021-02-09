export interface DepartmentStatisticsResponseDto {
  department: string;
  meetingCount: number;
  totalSeconds: number;
  totalCost: number;
  averageCost: number;
  inventorySecondsAvailable: number;
}
