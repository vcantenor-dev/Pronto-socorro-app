/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ScreenName,
  UserProfile,
  LocationData,
  HealthConditionKey,
  EmergencyContact,
  AccidentKey,
} from './types';
import {
  getSavedProfile,
  saveUserProfile,
  resetUserProfile,
  DEMO_PROFILE,
  BLANK_PROFILE,
  HEALTH_CONDITIONS_META,
} from './utils/storage';
import { getEmergencyLocation } from './utils/location';
import { soundManager } from './utils/audio';

import { AndroidFrame } from './components/AndroidFrame';
import { BottomTabBar } from './components/BottomTabBar';
import { PresentationScreen } from './screens/PresentationScreen';
import { UserRegistrationScreen } from './screens/UserRegistrationScreen';
import { HealthRegistrationScreen } from './screens/HealthRegistrationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { EmergencyConfirmModal } from './screens/EmergencyConfirmModal';
import { EmergencyActiveScreen } from './screens/EmergencyActiveScreen';
import { EmergencyProfileScreen } from './screens/EmergencyProfileScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GuidesListScreen } from './screens/GuidesListScreen';
import { AccidentsScreen } from './screens/AccidentsScreen';
import { AccidentDetailScreen } from './screens/AccidentDetailScreen';

// 6 Specific First Aid Guides
import { CPRGuide } from './components/Guides/CPRGuide';
import { HeartAttackGuide } from './components/Guides/HeartAttackGuide';
import { AsthmaGuide } from './components/Guides/AsthmaGuide';
import { SeizureGuide } from './components/Guides/SeizureGuide';
import { AnaphylaxisGuide } from './components/Guides/AnaphylaxisGuide';
import { DiabetesGuide } from './components/Guides/DiabetesGuide';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => getSavedProfile());
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(() => {
    const saved = getSavedProfile();
    return saved.hasCompletedOnboarding ? 'home' : 'presentation';
  });

  const [selectedAccidentKey, setSelectedAccidentKey] = useState<AccidentKey>('cut_wound');
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  const [emergencyVictimType, setEmergencyVictimType] = useState<'self' | 'third_party'>('self');
  const [emergencyTime, setEmergencyTime] = useState<string>('');
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    addressDescription: 'Aguardando acionamento de emergência',
    status: 'idle',
    timestamp: null,
  });

  const isMainView = !['presentation', 'user_registration', 'health_registration', 'emergency_active'].includes(currentScreen);

  // Call SAMU 192 handler
  const handleCallSamu = useCallback(() => {
    soundManager.playConfirmSound();
    // Native Android / Mobile dialer intent
    window.location.href = 'tel:192';
  }, []);

  // Fetch location upon emergency activation
  const triggerEmergencyLocation = useCallback(() => {
    getEmergencyLocation((loc) => {
      setLocation(loc);
    });
  }, []);

  // Start Emergency Flow
  const handleStartEmergency = (victimType: 'self' | 'third_party' = 'self') => {
    soundManager.playConfirmSound();
    setIsConfirmOpen(false);
    setEmergencyActive(true);
    setEmergencyVictimType(victimType);

    const nowStr = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setEmergencyTime(nowStr);

    // 1. Get GPS coordinates
    triggerEmergencyLocation();

    // 2. Open active emergency dashboard
    setCurrentScreen('emergency_active');

    // 3. Initiate phone call prompt in background
    try {
      window.location.href = 'tel:192';
    } catch {
      // Browser dialer fallback
    }
  };

  const handleEndEmergency = () => {
    setEmergencyActive(false);
    setEmergencyVictimType('self');
    setCurrentScreen('home');
  };

  // Open guide based on condition
  const handleOpenGuideForCondition = (conditionKey?: HealthConditionKey) => {
    if (!conditionKey) {
      setCurrentScreen('guide_cpr');
      return;
    }

    switch (conditionKey) {
      case 'heart':
        setCurrentScreen('guide_heart_attack');
        break;
      case 'asthma':
        setCurrentScreen('guide_asthma');
        break;
      case 'seizure':
        setCurrentScreen('guide_seizure');
        break;
      case 'anaphylaxis':
        setCurrentScreen('guide_anaphylaxis');
        break;
      case 'diabetes':
        setCurrentScreen('guide_diabetes');
        break;
      default:
        setCurrentScreen('guide_cpr');
        break;
    }
  };

  // Update profile and persist
  const handleUpdateProfile = (partial: Partial<UserProfile>) => {
    const updated = { ...profile, ...partial };
    setProfile(updated);
    saveUserProfile(updated);
  };

  // Load demo profile
  const handleLoadDemo = () => {
    setProfile(DEMO_PROFILE);
    saveUserProfile(DEMO_PROFILE);
    setCurrentScreen('home');
  };

  // Reset profile
  const handleResetProfile = () => {
    resetUserProfile();
    setProfile(BLANK_PROFILE);
    setCurrentScreen('presentation');
  };

  return (
    <AndroidFrame
      activeEmergency={emergencyActive}
      onQuickCallSamu={handleCallSamu}
      footer={
        isMainView ? (
          <BottomTabBar
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onQuickCallSamu={handleCallSamu}
          />
        ) : null
      }
    >
      {/* Rapid Emergency Confirmation Modal */}
      <EmergencyConfirmModal
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => handleStartEmergency('self')}
        onThirdPartyConfirm={() => handleStartEmergency('third_party')}
        onDirectCPR={() => {
          setIsConfirmOpen(false);
          setCurrentScreen('guide_cpr');
        }}
      />

      {/* Screen 1: Presentation */}
      {currentScreen === 'presentation' && (
        <PresentationScreen
          onStartRegistration={() => setCurrentScreen('user_registration')}
          onUseDemoProfile={handleLoadDemo}
          onSkipToHome={() => setCurrentScreen('home')}
        />
      )}

      {/* Screen 2: User Registration (Step 1) */}
      {currentScreen === 'user_registration' && (
        <UserRegistrationScreen
          profile={profile}
          onNext={(data) => {
            handleUpdateProfile(data);
            setCurrentScreen('health_registration');
          }}
          onBack={() => setCurrentScreen('presentation')}
        />
      )}

      {/* Screen 3: Health Registration (Step 2) */}
      {currentScreen === 'health_registration' && (
        <HealthRegistrationScreen
          profile={profile}
          onSave={(data) => {
            handleUpdateProfile(data);
            setCurrentScreen('home');
          }}
          onBack={() => setCurrentScreen('user_registration')}
        />
      )}

      {/* Screen 4: Main Home (Big Emergency Button) */}
      {currentScreen === 'home' && (
        <HomeScreen
          profile={profile}
          onPressEmergency={() => setIsConfirmOpen(true)}
          onPressThirdPartyEmergency={() => handleStartEmergency('third_party')}
          onOpenProfile={() => setCurrentScreen('emergency_profile')}
          onOpenContacts={() => setCurrentScreen('emergency_contacts')}
          onOpenSettings={() => setCurrentScreen('settings')}
          onOpenGuidesList={() => setCurrentScreen('guides_list')}
          onOpenAccidents={() => setCurrentScreen('accidents_tab')}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
        />
      )}

      {/* NOVA ABA PRINCIPAL: Acidentes & Traumas */}
      {currentScreen === 'accidents_tab' && (
        <AccidentsScreen
          onSelectAccident={(key) => {
            setSelectedAccidentKey(key);
            setCurrentScreen('accident_detail');
          }}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onCallSamu={handleCallSamu}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* Detalhe do Acidente com Instruções Imediatas */}
      {currentScreen === 'accident_detail' && (
        <AccidentDetailScreen
          accidentKey={selectedAccidentKey}
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'accidents_tab')}
        />
      )}

      {/* Screen 5: Emergency Profile (Ficha Médica) */}
      {currentScreen === 'emergency_profile' && (
        <EmergencyProfileScreen
          profile={profile}
          onEdit={() => setCurrentScreen('user_registration')}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* Screen 7: Emergency Active Screen */}
      {currentScreen === 'emergency_active' && (
        <EmergencyActiveScreen
          profile={profile}
          location={location}
          emergencyTime={emergencyTime}
          initialVictimType={emergencyVictimType}
          onCallSamu={handleCallSamu}
          onOpenGuide={(cond) => handleOpenGuideForCondition(cond)}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onOpenAccident={(key) => {
            setSelectedAccidentKey(key);
            setCurrentScreen('accident_detail');
          }}
          onEndEmergency={handleEndEmergency}
          onRefreshLocation={triggerEmergencyLocation}
        />
      )}

      {/* Screen 8: CPR Guide */}
      {currentScreen === 'guide_cpr' && (
        <CPRGuide
          onCallSamu={handleCallSamu}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 9: Heart Attack Guide */}
      {currentScreen === 'guide_heart_attack' && (
        <HeartAttackGuide
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 10: Asthma Guide */}
      {currentScreen === 'guide_asthma' && (
        <AsthmaGuide
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 11: Seizure Guide */}
      {currentScreen === 'guide_seizure' && (
        <SeizureGuide
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 12: Anaphylaxis Guide */}
      {currentScreen === 'guide_anaphylaxis' && (
        <AnaphylaxisGuide
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 13: Diabetes Guide */}
      {currentScreen === 'guide_diabetes' && (
        <DiabetesGuide
          onCallSamu={handleCallSamu}
          onOpenCPR={() => setCurrentScreen('guide_cpr')}
          onBack={() => setCurrentScreen(emergencyActive ? 'emergency_active' : 'guides_list')}
        />
      )}

      {/* Screen 14: Emergency Contacts */}
      {currentScreen === 'emergency_contacts' && (
        <ContactsScreen
          profile={profile}
          onUpdateContacts={(contacts: EmergencyContact[]) => {
            handleUpdateProfile({ contacts });
          }}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* Screen 15: Settings */}
      {currentScreen === 'settings' && (
        <SettingsScreen
          profile={profile}
          onLoadDemo={handleLoadDemo}
          onReset={handleResetProfile}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* Additional Screen: Guides Explorer */}
      {currentScreen === 'guides_list' && (
        <GuidesListScreen
          onSelectGuide={(screen) => setCurrentScreen(screen)}
          onBack={() => setCurrentScreen('home')}
        />
      )}
    </AndroidFrame>
  );
}
