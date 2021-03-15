import {ErrorSm} from '../../state/models/errorSm';

export interface PageDto<T> {
  totalPages?: number;
  totalElements?: number;
  size?: number;
  number?: number;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  content?: T[];
  errors?: ErrorSm[];
}
