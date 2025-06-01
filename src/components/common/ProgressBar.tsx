import React from 'react';

interface ProgressBarProps {
  steps: {
    id: string;
    name: string;
    completed: boolean;
    date?: Date;
  }[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex flex-col items-center">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center border-2 z-10 ${
                  index < currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : index === currentStep
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-500'
                } transition-all duration-300`}
              >
                {index < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.name}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-auto border-t-2 transition-colors duration-300 ${
                  index < currentStep ? 'border-blue-600' : 'border-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;