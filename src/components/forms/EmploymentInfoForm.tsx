import React from 'react';
import { EmploymentInfo } from '../../types/loanTypes';

interface EmploymentInfoFormProps {
  data: Partial<EmploymentInfo>;
  onChange: (data: Partial<EmploymentInfo>) => void;
}

const EmploymentInfoForm: React.FC<EmploymentInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
          Employment Status *
        </label>
        <select
          id="employmentStatus"
          name="employmentStatus"
          value={data.employmentStatus || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Status</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Retired">Retired</option>
          <option value="Student">Student</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
          Employer Name *
        </label>
        <input
          type="text"
          name="employerName"
          id="employerName"
          value={data.employerName || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
          Job Title *
        </label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={data.jobTitle || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
          Monthly Income (USD) *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="monthlyIncome"
            id="monthlyIncome"
            value={data.monthlyIncome || ''}
            onChange={handleNumberChange}
            required
            min="0"
            className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="0.00"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="employmentLength" className="block text-sm font-medium text-gray-700">
          Years at Current Employer *
        </label>
        <input
          type="number"
          name="employmentLength"
          id="employmentLength"
          value={data.employmentLength || ''}
          onChange={handleNumberChange}
          required
          min="0"
          step="0.5"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default EmploymentInfoForm;