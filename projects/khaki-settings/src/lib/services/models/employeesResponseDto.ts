export interface EmployeeDto {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  notify?: boolean;
}

export interface EmployeesResponseDto {
  employees: EmployeeDto[];
}
