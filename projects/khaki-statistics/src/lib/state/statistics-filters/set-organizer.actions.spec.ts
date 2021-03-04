import * as setOrganizerAction from './set-organizer.actions';

describe('setOrganizerAction', () => {
  it('should return an action', () => {
    expect(setOrganizerAction.setOrganizerAction({organizer: '123'}).type).toBe('[Khaki Statistics] Set Organizer');
  });
});
