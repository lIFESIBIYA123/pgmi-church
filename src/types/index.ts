export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Pastor {
  id: string;
  name: string;
  title: string;
  role?: string; // Alternative to title for backward compatibility
  bio: string;
  image: string;
  email: string;
  phone: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  meetingTime: string;
  location: string;
  leader: string;
  contact: string;
  activities: string[];
  image: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  category: string;
  series: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  audioUrl?: string;
  downloadUrl?: string;
  tags: string[];
  views: number;
  downloads: number;
  isLive?: boolean;
  liveStreamUrl?: string;
  sermonNotes?: string;
  bibleReferences?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  series?: string;
  description: string;
  image: string;
  attendees: number;
  maxAttendees?: number;
  isRecurring: boolean;
  recurrence?: string;
  registration: boolean;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  requestType: string;
  title: string;
  description: string;
  urgency: 'low' | 'normal' | 'high' | 'critical';
  isAnonymous: boolean;
  allowSharing: boolean;
  status: 'pending' | 'praying' | 'answered' | 'closed';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  type: string;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface ChurchInfo {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    officeHours: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  serviceTimes: {
    sunday: string;
    wednesday?: string;
    friday?: string;
  };
  mission: string;
  vision: string;
  values: string[];
}

export interface ServiceImage {
  id: string;
  sermonId: string;
  imageUrl: string;
  caption?: string;
  altText: string;
  order: number;
  createdAt: Date;
}

// Import sermon input type from validator
export type { ISermonInput } from '@/lib/validator';
