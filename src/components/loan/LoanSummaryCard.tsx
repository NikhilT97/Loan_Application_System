import React from 'react';
import { Loan } from '../../types/loanTypes';
import StatusBadge from '../common/StatusBadge';
import { Calendar, DollarSign, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface LoanSummaryCardProps {
  loan: Loan;
}

const LoanSummaryCard: React.FC<LoanSummaryCardProps> = ({ loan }) => {
  const progressPercentage = (loan.totalPaid / loan.amount) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{loan.type}</h3>
            <p className="text-gray-500 text-sm">Loan #{loan.id}</p>
          </div>
          <StatusBadge status={loan.status} />
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Loan</span>
            <span className="font-semibold">{formatCurrency(loan.amount)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>Paid: {formatCurrency(loan.totalPaid)}</span>
            <span>Remaining: {formatCurrency(loan.totalRemaining)}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Monthly Payment</p>
                <p className="font-semibold">{formatCurrency(loan.monthlyPayment)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Next Payment</p>
                <p className="font-semibold">{formatDate(loan.nextPaymentDate)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Term</p>
              <p className="font-semibold">{loan.term} months ({(loan.term / 12).toFixed(1)} years)</p>
            </div>
            <p className="text-xs text-gray-500">
              Interest Rate: <span className="font-semibold">{loan.interestRate}%</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3">
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default LoanSummaryCard;