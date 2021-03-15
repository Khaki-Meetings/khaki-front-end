import {PageDto} from './pagable-dto';

export interface CalendarEventDto {
  eventLengthSeconds: number,
  eventStartDate?: Date;
  eventStartTime?: string;
  eventEndDate?: Date;
  eventEndTime?: string;
  title?: string;
  numAttendees?: number;
}

export interface CalendarEventsResponseDto extends PageDto<CalendarEventsResponseDto>{
  calendarEvents: CalendarEventDto[];
}
