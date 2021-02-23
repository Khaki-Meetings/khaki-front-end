import * as fromOrganizersTablePageable from './organizers-table-pageable.reducer';
import { selectOrganizersTablePageableState } from './organizers-table-pageable.selectors';

describe('OrganizersTablePageable Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrganizersTablePageableState({
      [fromOrganizersTablePageable.organizersTablePageableAttributeKey]: {}
    });

    expect(result).toEqual({});
  });
});
