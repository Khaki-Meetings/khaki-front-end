export interface MeetingListSm {
  organizerEmail: string;
  organizerFirstName: string;
  organizerLastName: string;
  totalMeetings: number;
  totalSeconds: number;
  totalCost: number;
  start: Date;
  end: Date;
  summary: string;
  numberInternalAttendees: number;
}
