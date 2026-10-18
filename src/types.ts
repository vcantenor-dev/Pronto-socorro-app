export type ScreenName =
  | 'presentation'
  | 'user_registration'
  | 'health_registration'
  | 'home'
  | 'accidents_tab'
  | 'accident_detail'
  | 'emergency_profile'
  | 'emergency_active'
  | 'guide_cpr'
  | 'guide_heart_attack'
  | 'guide_asthma'
  | 'guide_seizure'
  | 'guide_anaphylaxis'
  | 'guide_diabetes'
  | 'emergency_contacts'
  | 'settings'
  | 'guides_list';

export type AccidentKey =
  | 'severe_bleeding'
  | 'cut_wound'
  | 'fracture_dislocation'
  | 'fall_trauma'
  | 'burn'
  | 'electric_shock'
  | 'choking';

export type HealthConditionKey =
  | 'heart'
  | 'asthma'
  | 'seizure'
  | 'diabetes'
  | 'anaphylaxis'
  | 'other';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface UserProfile {
  fullName: string;
  age: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  contacts: EmergencyContact[];
  conditions: HealthConditionKey[];
  otherConditionText: string;
  allergies: string;
  medications: string;
  importantNotes: string;
  bloodType?: string;
  registeredAt: string;
  hasCompletedOnboarding: boolean;
}

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  addressDescription: string;
  status: 'idle' | 'obtaining' | 'obtained' | 'error';
  errorMessage?: string;
  timestamp: string | null;
}

export interface EmergencySession {
  isActive: boolean;
  startTime: string | null;
  primaryConditionKey: HealthConditionKey | null;
  location: LocationData;
  callSAMUInitiated: boolean;
  contactAlerted: boolean;
}
