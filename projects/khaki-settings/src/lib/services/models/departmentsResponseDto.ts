import { PageableSm } from '../../state/models/pageable-sm';

export interface DepartmentDto {
    name?: string;
}

export interface DepartmentsResponseDto {
    departments: DepartmentDto[];
}

export interface DepartmentsResponsePageableDto extends PageableSm<DepartmentDto> {
}
