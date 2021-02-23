import { organizersTablePageableReducer, initialState } from './organizers-table-pageable.reducer';

describe('OrganizersTablePageable Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = organizersTablePageableReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
