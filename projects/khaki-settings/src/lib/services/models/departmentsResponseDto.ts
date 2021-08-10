import { PageableSm } from '../../state/models/pageable-sm';

export interface DepartmentDto {
    id: string;
    name?: string;
}

export interface DepartmentsResponseDto {
    departments: DepartmentDto[];
}

export interface DepartmentsResponsePageableDto extends PageableSm<DepartmentDto> {
}
