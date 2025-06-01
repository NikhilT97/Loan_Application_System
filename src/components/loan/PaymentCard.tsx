import React from 'react';
import { Payment } from '../../types/loanTypes';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Calendar, CreditCard } from 'lucide-react';

interface PaymentCardProps {
  payment: Payment;
  loanId: string;
  onMakePayment: (loanId: string, paymentId: string) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment, loanId, onMakePayment }) => {
  const isPaid = payment.status === 'Paid';
  const isOverdue = payment.status === 'Overdue';
  
  const paymentDate = new Date(payment.date);
  const today = new Date();
  
  // Calculate days left or overdue
  const diffTime = paymentDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const getDateStatusText = () => {
    if (isPaid) return 'Paid on';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    if (diffDays === 0) return 'Due today';
    return `Overdue by ${Math.abs(diffDays)} days`;
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300 ${
      isPaid ? 'border-gray-200' : 
      isOverdue ? 'border-red-300 hover:shadow-md' : 
      'border-blue-300 hover:shadow-md'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Calendar className={`h-5 w-5 mr-2 ${
              isPaid ? 'text-gray-400' : 
              isOverdue ? 'text-red-500' : 
              'text-blue-500'
            }`} />
            <div>
              <p className="text-sm font-medium">{formatDate(payment.date)}</p>
              <p className={`text-xs ${
                isPaid ? 'text-gray-500' : 
                isOverdue ? 'text-red-600 font-medium' : 
                'text-blue-600'
              }`}>
                {getDateStatusText()}
              </p>
            </div>
          </div>
          <StatusBadge status={payment.status} size="sm" />
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Payment Amount</p>
            <p className="font-semibold">{formatCurrency(payment.amount)}</p>
          </div>
          
          {!isPaid && (
            <button
              onClick={() => onMakePayment(loanId, payment.id)}
              className={`flex items-center py-1 px-3 rounded-md text-sm font-medium ${
                isOverdue 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              } transition-colors`}
            >
              <CreditCard className="h-4 w-4 mr-1" />
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;