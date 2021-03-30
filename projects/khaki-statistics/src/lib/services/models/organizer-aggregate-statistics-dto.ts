import {OrganizerDto} from './organizer-dto';

export interface OrganizerAggregateStatisticsDto {
  organizer: OrganizerDto;
  internalMeetingCount: number;
  internalMeetingSeconds: number;
  externalMeetingCount: number;
  externalMeetingSeconds: number;
}
