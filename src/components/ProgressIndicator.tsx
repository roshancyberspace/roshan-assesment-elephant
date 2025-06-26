
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-center items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                isCompleted
                  ? 'w-12 bg-gradient-to-r from-gray-800 to-gray-700 shadow-md'
                  : isCurrent
                  ? 'w-16 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg scale-105'
                  : 'w-8 bg-gray-200'
              }`}
            />
          );
        })}
      </div>
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 font-medium tracking-wide">
          Step {currentStep} of {totalSteps}
        </p>
        <div className="mt-2 w-24 mx-auto bg-gray-100 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-gray-800 to-gray-700 h-1 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default ProgressIndicator;
