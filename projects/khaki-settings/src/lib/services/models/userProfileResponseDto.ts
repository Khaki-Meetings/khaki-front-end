
export interface UserProfileResponseDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  notify?: boolean;
  companyName?: string;
}

export interface SaveUserProfileSuccessSmResponseDto {
  success?: string;
}
