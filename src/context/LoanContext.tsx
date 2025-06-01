import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loan, LoanApplication, LoanStatus, LoanType, PaymentStatus } from '../types/loanTypes';

// Sample data for demonstration purposes
const initialLoans: Loan[] = [
  {
    id: '1',
    type: LoanType.PERSONAL,
    amount: 10000,
    interestRate: 5.5,
    term: 36,
    monthlyPayment: 301.96,
    status: LoanStatus.ACTIVE,
    startDate: new Date('2023-01-15'),
    endDate: new Date('2026-01-15'),
    nextPaymentDate: new Date('2023-06-15'),
    nextPaymentAmount: 301.96,
    totalPaid: 1509.80,
    totalRemaining: 8490.20,
    payments: [
      { id: '1', date: new Date('2023-02-15'), amount: 301.96, status: PaymentStatus.PAID },
      { id: '2', date: new Date('2023-03-15'), amount: 301.96, status: PaymentStatus.PAID },
      { id: '3', date: new Date('2023-04-15'), amount: 301.96, status: PaymentStatus.PAID },
      { id: '4', date: new Date('2023-05-15'), amount: 301.96, status: PaymentStatus.PAID },
      { id: '5', date: new Date('2023-06-15'), amount: 301.96, status: PaymentStatus.UPCOMING },
      { id: '6', date: new Date('2023-07-15'), amount: 301.96, status: PaymentStatus.UPCOMING },
    ]
  }
];

const initialApplications: LoanApplication[] = [
  {
    id: '1',
    type: LoanType.PERSONAL,
    amount: 15000,
    term: 48,
    purpose: 'Home renovation',
    status: LoanStatus.UNDER_REVIEW,
    submissionDate: new Date('2023-05-10'),
    documents: [
      { id: '1', name: 'ID Proof', status: 'Verified' },
      { id: '2', name: 'Income Proof', status: 'Under Review' },
      { id: '3', name: 'Address Proof', status: 'Verified' },
    ],
    steps: [
      { id: '1', name: 'Application Submitted', completed: true, date: new Date('2023-05-10') },
      { id: '2', name: 'Document Verification', completed: true, date: new Date('2023-05-12') },
      { id: '3', name: 'Credit Check', completed: true, date: new Date('2023-05-14') },
      { id: '4', name: 'Final Approval', completed: false },
      { id: '5', name: 'Loan Disbursement', completed: false },
    ]
  }
];

interface LoanContextType {
  loans: Loan[];
  applications: LoanApplication[];
  currentApplication: Partial<LoanApplication> | null;
  updateCurrentApplication: (data: Partial<LoanApplication>) => void;
  submitApplication: () => void;
  makePayment: (loanId: string, paymentId: string) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [applications, setApplications] = useState<LoanApplication[]>(initialApplications);
  const [currentApplication, setCurrentApplication] = useState<Partial<LoanApplication> | null>(null);

  const updateCurrentApplication = (data: Partial<LoanApplication>) => {
    setCurrentApplication(prev => ({ ...prev, ...data }));
  };

  const submitApplication = () => {
    if (currentApplication) {
      const newApplication: LoanApplication = {
        id: Date.now().toString(),
        type: currentApplication.type || LoanType.PERSONAL,
        amount: currentApplication.amount || 0,
        term: currentApplication.term || 0,
        purpose: currentApplication.purpose || '',
        status: LoanStatus.SUBMITTED,
        submissionDate: new Date(),
        documents: [],
        steps: [
          { id: '1', name: 'Application Submitted', completed: true, date: new Date() },
          { id: '2', name: 'Document Verification', completed: false },
          { id: '3', name: 'Credit Check', completed: false },
          { id: '4', name: 'Final Approval', completed: false },
          { id: '5', name: 'Loan Disbursement', completed: false },
        ]
      };
      
      setApplications([...applications, newApplication]);
      setCurrentApplication(null);
    }
  };

  const makePayment = (loanId: string, paymentId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        const updatedPayments = loan.payments.map(payment => {
          if (payment.id === paymentId) {
            return { ...payment, status: PaymentStatus.PAID };
          }
          return payment;
        });
        
        const totalPaid = updatedPayments
          .filter(p => p.status === PaymentStatus.PAID)
          .reduce((sum, p) => sum + p.amount, 0);
          
        return {
          ...loan,
          payments: updatedPayments,
          totalPaid,
          totalRemaining: loan.amount - totalPaid
        };
      }
      return loan;
    }));
  };

  return (
    <LoanContext.Provider value={{
      loans,
      applications,
      currentApplication,
      updateCurrentApplication,
      submitApplication,
      makePayment
    }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};