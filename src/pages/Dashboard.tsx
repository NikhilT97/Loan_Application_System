import React from 'react';
import { useLoan } from '../context/LoanContext';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import LoanSummaryCard from '../components/loan/LoanSummaryCard';
import ApplicationCard from '../components/loan/ApplicationCard';
import { ArrowRight, Plus, CreditCard, BarChart4, AlertCircle, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const { loans, applications } = useLoan();
  
  // Get the next payment date across all loans
  const getNextPaymentInfo = () => {
    if (loans.length === 0) return null;
    
    const loansWithUpcomingPayments = loans.filter(
      loan => loan.payments.some(p => p.status === 'Upcoming')
    );
    
    if (loansWithUpcomingPayments.length === 0) return null;
    
    const nextPayments = loansWithUpcomingPayments.map(loan => {
      const nextPayment = loan.payments.find(p => p.status === 'Upcoming');
      return {
        loanId: loan.id,
        loanType: loan.type,
        date: nextPayment?.date || new Date(),
        amount: nextPayment?.amount || 0
      };
    });
    
    nextPayments.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return nextPayments[0];
  };
  
  const nextPayment = getNextPaymentInfo();
  
  // Calculate days until next payment
  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/apply"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Apply for a Loan
          </Link>
        </div>
      </div>
      
      {nextPayment && (
        <div className="mt-8">
          <div className="rounded-lg bg-blue-50 overflow-hidden shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-blue-900">
                    Upcoming Payment
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-blue-700">
                    <p>
                      Your next payment for {nextPayment.loanType} is due in {getDaysUntil(nextPayment.date)} days.
                    </p>
                  </div>
                  <div className="mt-3 text-blue-900 font-semibold text-xl">
                    {formatCurrency(nextPayment.amount)} <span className="text-sm font-normal text-blue-700">due on {formatDate(nextPayment.date)}</span>
                  </div>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    <CreditCard className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {loans.filter(loan => loan.status === 'Active').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/repayment"
                className="font-medium text-blue-700 hover:text-blue-900 flex items-center"
              >
                View all loans
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {applications.filter(app => app.status !== 'Approved' && app.status !== 'Rejected').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/status"
                className="font-medium text-blue-700 hover:text-blue-900 flex items-center"
              >
                View applications
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart4 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Outstanding
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(
                        loans.reduce((sum, loan) => sum + loan.totalRemaining, 0)
                      )}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/repayment"
                className="font-medium text-blue-700 hover:text-blue-900 flex items-center"
              >
                View payment schedule
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Loans
        </h3>
        
        {loans.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loans.map(loan => (
              <LoanSummaryCard key={loan.id} loan={loan} />
            ))}
          </div>
        ) : (
          <Card className="mt-4">
            <div className="text-center py-4">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No active loans</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by applying for a loan.
              </p>
              <div className="mt-6">
                <Link
                  to="/apply"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Apply for a Loan
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Applications
        </h3>
        
        {applications.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {applications.slice(0, 2).map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : (
          <Card className="mt-4">
            <div className="text-center py-4">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't submitted any loan applications yet.
              </p>
              <div className="mt-6">
                <Link
                  to="/apply"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Application
                </Link>
              </div>
            </div>
          </Card>
        )}
        
        {applications.length > 2 && (
          <div className="mt-4 text-right">
            <Link
              to="/status"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all applications <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Complete your profile to improve your loan approval chances. 
                  <a href="#" className="font-medium text-yellow-700 underline hover:text-yellow-600">
                    Update profile
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;