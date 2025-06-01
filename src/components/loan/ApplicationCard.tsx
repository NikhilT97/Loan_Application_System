import React from 'react';
import { LoanApplication } from '../../types/loanTypes';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { FileText, Clock } from 'lucide-react';

interface ApplicationCardProps {
  application: LoanApplication;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const currentStep = application.steps.findIndex(step => !step.completed);
  const progress = currentStep === -1 
    ? 100 
    : (currentStep / application.steps.length) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{application.type}</h3>
            <p className="text-gray-500 text-sm">Application #{application.id}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
        
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-semibold">{formatCurrency(application.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Term</p>
            <p className="font-semibold">{application.term} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="font-semibold">{formatDate(application.submissionDate)}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 text-sm">Progress</span>
            <span className="text-gray-600 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Current Status:</p>
          <div className="space-y-2">
            {application.steps.map((step, index) => {
              const isCurrent = index === currentStep;
              return (
                <div 
                  key={step.id} 
                  className={`flex items-center p-2 rounded-md ${
                    isCurrent ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'border-2 border-blue-500' 
                      : 'border-2 border-gray-300'
                  }`}>
                    {step.completed && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${isCurrent ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                      {step.name}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex">
        <button className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mr-2">
          <span className="flex items-center justify-center">
            <FileText className="h-4 w-4 mr-1" />
            View Details
          </span>
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <span className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-1" />
            Track Status
          </span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;