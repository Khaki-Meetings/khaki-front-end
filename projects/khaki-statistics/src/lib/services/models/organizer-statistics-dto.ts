import {OrganizerDto} from './organizer-dto';

export interface OrganizerStatisticsDto {
  organizer: OrganizerDto;
  totalMeetings: number;
  totalHours: number;
  totalCost: number;
}
