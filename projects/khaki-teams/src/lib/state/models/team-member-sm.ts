export interface TeamMemberSm {
  id: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  notify?: boolean;
  totalMeetings?: number;
  totalSeconds?: number;  
}
