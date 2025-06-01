import React, { useState } from 'react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import LoanDetailsForm from '../components/forms/LoanDetailsForm';
import EmploymentInfoForm from '../components/forms/EmploymentInfoForm';
import DocumentUploadForm from '../components/forms/DocumentUploadForm';
import ProgressBar from '../components/common/ProgressBar';
import { PersonalInfo } from '../types/loanTypes';

const LoanApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<Partial<PersonalInfo>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const steps = [
    {
      id: '1',
      name: 'Personal Info',
      completed: step > 1
    },
    {
      id: '2',
      name: 'Loan Details',
      completed: step > 2
    },
    {
      id: '3',
      name: 'Employment',
      completed: step > 3
    },
    {
      id: '4',
      name: 'Documents',
      completed: step > 4
    }
  ];

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePersonalInfoChange = (data: Partial<PersonalInfo>) => {
    setPersonalInfo(data);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm data={personalInfo} onChange={handlePersonalInfoChange} />;
      case 2:
        return <LoanDetailsForm />;
      case 3:
        return <EmploymentInfoForm />;
      case 4:
        return <DocumentUploadForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Loan Application
          </h1>
          
          <div className="mb-8">
            <ProgressBar steps={steps} currentStep={step} />
          </div>

          {renderStep()}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
            )}
            {step < steps.length && (
              <button
                onClick={nextStep}
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;