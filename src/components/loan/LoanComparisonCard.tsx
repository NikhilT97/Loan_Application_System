import React, { useState } from 'react';
import { LoanType } from '../../types/loanTypes';
import { formatCurrency } from '../../utils/formatters';
import { Check, Clock, DollarSign, Percent, Star } from 'lucide-react';

interface LoanOptionProps {
  type: LoanType;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  processingTime: string;
  benefits: string[];
  isPopular?: boolean;
}

const LoanComparisonCard: React.FC<LoanOptionProps> = ({
  type,
  interestRate,
  minAmount,
  maxAmount,
  minTerm,
  maxTerm,
  processingTime,
  benefits,
  isPopular = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg transform scale-[1.02]' : ''
      } ${isPopular ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Popular Choice
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{type}</h3>
        
        <div className="flex items-baseline mt-4 mb-6">
          <span className="text-3xl font-extrabold text-gray-900">{interestRate}%</span>
          <span className="ml-1 text-xl font-semibold text-gray-500">APR</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Loan Amount</p>
              <p className="text-sm text-gray-500">
                {formatCurrency(minAmount)} - {formatCurrency(maxAmount)}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Loan Term</p>
              <p className="text-sm text-gray-500">
                {minTerm} - {maxTerm} months
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Percent className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Processing Time</p>
              <p className="text-sm text-gray-500">{processingTime}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Benefits</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Check className="h-3 w-3 text-blue-600" />
                </span>
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <button className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
          isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LoanComparisonCard;