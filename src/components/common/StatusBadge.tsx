import React from 'react';
import { LoanStatus, PaymentStatus } from '../../types/loanTypes';

interface StatusBadgeProps {
  status: LoanStatus | PaymentStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let bgColor, textColor;
  
  switch (status) {
    case LoanStatus.SUBMITTED:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case LoanStatus.UNDER_REVIEW:
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case LoanStatus.APPROVED:
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case LoanStatus.REJECTED:
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case LoanStatus.ACTIVE:
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case LoanStatus.CLOSED:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    case PaymentStatus.PAID:
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case PaymentStatus.UPCOMING:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case PaymentStatus.OVERDUE:
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'Verified':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Rejected':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Under Review':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center rounded-full ${bgColor} ${textColor} font-medium ${sizeClasses[size]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;