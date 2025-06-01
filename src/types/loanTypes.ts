export enum LoanType {
  PERSONAL = 'Personal Loan',
  HOME = 'Home Loan',
  AUTO = 'Auto Loan',
  EDUCATION = 'Education Loan',
  BUSINESS = 'Business Loan'
}

export enum LoanStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  ACTIVE = 'Active',
  CLOSED = 'Closed'
}

export enum PaymentStatus {
  PAID = 'Paid',
  UPCOMING = 'Upcoming',
  OVERDUE = 'Overdue'
}

export interface Payment {
  id: string;
  date: Date;
  amount: number;
  status: PaymentStatus;
}

export interface Document {
  id: string;
  name: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected';
  url?: string;
}

export interface ApplicationStep {
  id: string;
  name: string;
  completed: boolean;
  date?: Date;
}

export interface Loan {
  id: string;
  type: LoanType;
  amount: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  status: LoanStatus;
  startDate: Date;
  endDate: Date;
  nextPaymentDate: Date;
  nextPaymentAmount: number;
  totalPaid: number;
  totalRemaining: number;
  payments: Payment[];
}

export interface LoanApplication {
  id: string;
  type: LoanType;
  amount: number;
  term: number; // in months
  purpose: string;
  status: LoanStatus;
  submissionDate: Date;
  documents: Document[];
  steps: ApplicationStep[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmploymentInfo {
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
  employmentLength: number; // in years
}

export interface FinancialInfo {
  bankName: string;
  accountNumber: string;
  accountType: string;
  monthlyExpenses: number;
  existingLoans: number;
}