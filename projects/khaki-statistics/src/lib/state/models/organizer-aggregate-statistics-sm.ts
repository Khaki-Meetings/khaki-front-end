export interface OrganizerAggregateStatisticsSm {
  organizerId: string;
  organizerEmail: string;
  organizerFirstName: string;
  organizerLastName: string;
  organizerAvatarUrl: string;
  internalMeetingCount: number;
  internalMeetingSeconds: number;
  externalMeetingCount: number;
  externalMeetingSeconds: number;
}
