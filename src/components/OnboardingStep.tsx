
import React from 'react';

interface OnboardingStepProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-gray-100/50 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default OnboardingStep;
