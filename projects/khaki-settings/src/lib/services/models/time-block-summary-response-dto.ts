import {Moment} from 'moment/moment';

export class TimeBlockSummaryResponseDto {
  totalSeconds: number;
  meetingCount: number;
  start: Moment;
  end: Moment;
  numEmployees: number;
  numWorkdays: number;
  totalMeetingAttendees: number;
}
