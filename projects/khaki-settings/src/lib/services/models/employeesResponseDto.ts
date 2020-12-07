export interface EmployeeDto {
    avatar?: string;
    name?: string;
    subject?: string;
    department?: string;
}

export interface EmployeesResponseDto {
    employees: EmployeeDto[];
}
