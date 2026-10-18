import { UserProfile, HealthConditionKey } from '../types';

const PROFILE_KEY = 'pronto_socorro_user_profile';

export const HEALTH_CONDITIONS_META: Record<
  HealthConditionKey,
  { label: string; guideScreen: string; emergencyDescription: string; icon: string }
> = {
  heart: {
    label: 'Problemas cardíacos',
    guideScreen: 'guide_heart_attack',
    emergencyDescription: 'Histórico de cardiopatia / risco de infarto ou arritmia',
    icon: 'HeartPulse',
  },
  asthma: {
    label: 'Asma / Crise respiratória',
    guideScreen: 'guide_asthma',
    emergencyDescription: 'Doença respiratória crônica / crise de broncoespasmo',
    icon: 'Wind',
  },
  seizure: {
    label: 'Epilepsia / Histórico de convulsões',
    guideScreen: 'guide_seizure',
    emergencyDescription: 'Histórico de crises convulsivas / epilepsia',
    icon: 'Activity',
  },
  diabetes: {
    label: 'Diabetes',
    guideScreen: 'guide_diabetes',
    emergencyDescription: 'Diabetes mellitus / risco de hipoglicemia ou descompensação',
    icon: 'Droplet',
  },
  anaphylaxis: {
    label: 'Alergia grave / Anafilaxia',
    guideScreen: 'guide_anaphylaxis',
    emergencyDescription: 'Hipersensibilidade grave com risco de choque anafilático',
    icon: 'ShieldAlert',
  },
  other: {
    label: 'Outras condições importantes',
    guideScreen: 'emergency_active',
    emergencyDescription: 'Outra condição clínica documentada na ficha',
    icon: 'AlertCircle',
  },
};

export const DEMO_PROFILE: UserProfile = {
  fullName: 'Carlos Eduardo Ferreira',
  age: '54',
  emergencyContactName: 'Dra. Helena Ferreira (Esposa)',
  emergencyContactPhone: '(11) 98765-4321',
  contacts: [
    {
      id: '1',
      name: 'Dra. Helena Ferreira',
      phone: '(11) 98765-4321',
      relationship: 'Esposa / Médica de Família',
    },
    {
      id: '2',
      name: 'Lucas Ferreira',
      phone: '(11) 97654-3210',
      relationship: 'Filho',
    },
  ],
  conditions: ['heart', 'diabetes'],
  otherConditionText: '',
  allergies: 'Dipirona e Anti-inflamatórios (AINEs)',
  medications: 'AAS 100mg, Enalapril 10mg, Metformina 850mg',
  importantNotes: 'Possui stent coronário implantado em 2023. Não ofertar líquidos se estiver sonolento.',
  bloodType: 'O+',
  registeredAt: new Date().toISOString(),
  hasCompletedOnboarding: true,
};

export const BLANK_PROFILE: UserProfile = {
  fullName: '',
  age: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  contacts: [],
  conditions: [],
  otherConditionText: '',
  allergies: '',
  medications: '',
  importantNotes: '',
  bloodType: '',
  registeredAt: new Date().toISOString(),
  hasCompletedOnboarding: false,
};

export function getSavedProfile(): UserProfile {
  if (typeof window === 'undefined') return BLANK_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return BLANK_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving profile:', err);
  }
}

export function resetUserProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    //
  }
}
