import * as fromMeetingsList from './meetings-list.actions';

describe('loadMeetingsLists', () => {
  it('should return an action', () => {
    expect(fromMeetingsList.loadMeetingsListAction().type)
      .toBe('[MeetingsList] Load MeetingsList');
  });
});
