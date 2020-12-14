import {OrganizerDto} from './organizer-dto';

export interface OrganizerStatisticsDto {
  organizer: OrganizerDto;
  totalMeetings: number;
  totalSeconds: number;
  totalCost: number;
}
