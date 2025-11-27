export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description?: string; 
  address?: string;
  phoneNumber?: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
  hasDetails?: boolean;
}

export interface LocationDetails {
  title: string;
  address: string;
  imageUrl: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  SCHEDULE_DAY_1 = 'SCHEDULE_DAY_1',
  SCHEDULE_DAY_2 = 'SCHEDULE_DAY_2',
}