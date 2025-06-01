import React, { useState, useEffect } from 'react';
import { LoanType } from '../../types/loanTypes';

interface LoanDetailsFormProps {
  data: {
    type?: LoanType;
    amount?: number;
    term?: number;
    purpose?: string;
  };
  onChange: (data: {
    type?: LoanType;
    amount?: number;
    term?: number;
    purpose?: string;
  }) => void;
}

const LoanDetailsForm: React.FC<LoanDetailsFormProps> = ({ data, onChange }) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  
  // Mock interest rates based on loan type
  const getInterestRate = (type: LoanType = LoanType.PERSONAL): number => {
    switch (type) {
      case LoanType.PERSONAL: return 9.99;
      case LoanType.HOME: return 4.5;
      case LoanType.AUTO: return 5.99;
      case LoanType.EDUCATION: return 4.99;
      case LoanType.BUSINESS: return 7.99;
      default: return 9.99;
    }
  };
  
  // Calculate monthly payment
  useEffect(() => {
    if (data.amount && data.term) {
      const rate = getInterestRate(data.type) / 100 / 12; // Monthly interest rate
      const payments = data.term; // Number of payments
      const principal = data.amount;
      
      // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const x = Math.pow(1 + rate, payments);
      const monthly = (principal * x * rate) / (x - 1);
      
      setMonthlyPayment(parseFloat(monthly.toFixed(2)));
    } else {
      setMonthlyPayment(null);
    }
  }, [data.amount, data.term, data.type]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: parseFloat(value) || 0 });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Loan Type *
        </label>
        <select
          id="type"
          name="type"
          value={data.type || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Loan Type</option>
          {Object.values(LoanType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Loan Amount (USD) *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={data.amount || ''}
            onChange={handleNumberChange}
            required
            min="1000"
            max="100000"
            className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="0.00"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Minimum: $1,000 - Maximum: $100,000
        </p>
      </div>
      
      <div>
        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
          Loan Term (months) *
        </label>
        <input
          type="number"
          name="term"
          id="term"
          value={data.term || ''}
          onChange={handleNumberChange}
          required
          min="12"
          max="84"
          step="12"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <p className="mt-2 text-sm text-gray-500">
          Choose between 12 and 84 months (1-7 years)
        </p>
      </div>
      
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Loan Purpose *
        </label>
        <textarea
          id="purpose"
          name="purpose"
          rows={3}
          value={data.purpose || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Briefly describe how you plan to use this loan"
        />
      </div>
      
      {monthlyPayment !== null && data.type && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">Estimated Monthly Payment</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p className="font-semibold text-2xl">${monthlyPayment.toLocaleString()}</p>
              </div>
              <div className="mt-1 text-xs text-blue-600">
                Interest Rate: {getInterestRate(data.type)}% APR
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">Total Repayment</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p className="font-semibold text-lg">
                  ${(monthlyPayment * (data.term || 0)).toLocaleString()}
                </p>
              </div>
              <div className="mt-1 text-xs text-blue-600">
                Total Interest: ${((monthlyPayment * (data.term || 0)) - (data.amount || 0)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDetailsForm;