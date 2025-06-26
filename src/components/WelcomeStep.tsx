 import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';
import OnboardingStep from './OnboardingStep';

interface WelcomeStepProps {
  userName: string;
  onContinue: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ userName, onContinue }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  return (
    <OnboardingStep
      title={`Welcome, ${userName}!`}
      subtitle="Your account has been successfully created"
    >
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">All set!</h3>
          <p className="text-gray-600 leading-relaxed">
            {/* You're all ready to go. Redirecting you in {countdown} second{countdown !== 1 ? 's' : ''}... */}

            You're all ready to go. <br/> Redirecting to your dashboard in <strong>{countdown} sec</strong>...
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-12 font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go to Dashboard Now
        </Button>
      </div>
    </OnboardingStep>
  );
};

export default WelcomeStep;