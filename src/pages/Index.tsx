
import React, { useState } from 'react';
import ProgressIndicator from '@/components/ProgressIndicator';
import EmailStep from '@/components/EmailStep';
import OTPStep from '@/components/OTPStep';
import ProfileStep from '@/components/ProfileStep';
import WelcomeStep from '@/components/WelcomeStep';
import Dashboard from '@/components/Dashboard';

interface UserData {
  email: string;
  name: string;
  profileImage: string | null;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    profileImage: null,
  });
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const totalSteps = 5;

  const handleEmailSubmit = (email: string) => {
    setUserData(prev => ({ ...prev, email }));
    setCurrentStep(2);
  };

  const handleOTPVerification = () => {
    setCurrentStep(3);
  };

  const handleProfileSubmit = (name: string, profileImage: string | null) => {
    setUserData(prev => ({ ...prev, name, profileImage }));
    setCurrentStep(4);
  };

  const handleWelcomeComplete = () => {
    setCurrentStep(5);
    setIsOnboardingComplete(true);
  };

  const handleLogout = () => {
    setCurrentStart(1);
    setIsOnboardingComplete(false);
    setUserData({ email: '', name: '', profileImage: null });
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isOnboardingComplete) {
    return (
      <Dashboard
        user={{
          name: userData.name,
          email: userData.email,
          profileImage: userData.profileImage,
        }}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {currentStep === 1 && (
          <EmailStep onNext={handleEmailSubmit} />
        )}
        
        {currentStep === 2 && (
          <OTPStep
            email={userData.email}
            onNext={handleOTPVerification}
            onBack={goBack}
          />
        )}
        
        {currentStep === 3 && (
          <ProfileStep
            onNext={handleProfileSubmit}
            onBack={goBack}
          />
        )}
        
        {currentStep === 4 && (
          <WelcomeStep
            userName={userData.name}
            onContinue={handleWelcomeComplete}
          />
        )}

        {currentStep < 4 && (
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        )}
      </div>
    </div>
  );
};

export default Index;
