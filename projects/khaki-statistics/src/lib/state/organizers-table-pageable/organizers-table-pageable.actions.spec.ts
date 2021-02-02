import * as fromOrganizersTablePageable from './organizers-table-pageable.actions';

describe('loadOrganizersTablePageables', () => {
  it('should return an action', () => {
    expect(fromOrganizersTablePageable.setOrganizersTablePageablesAction.type).toBe('[OrganizersTablePageable] Load OrganizersTablePageables');
  });
});
