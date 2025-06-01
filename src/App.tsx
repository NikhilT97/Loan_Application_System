import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Dashboard from './pages/Dashboard';
import LoanApplicationForm from './pages/LoanApplicationForm';
import LoanStatusTracker from './pages/LoanStatusTracker';
import RepaymentCalendar from './pages/RepaymentCalendar';
import LoanComparison from './pages/LoanComparison';
import { LoanProvider } from './context/LoanContext';

function App() {
  return (
    <Router>
      <LoanProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/apply" element={<LoanApplicationForm />} />
              <Route path="/status" element={<LoanStatusTracker />} />
              <Route path="/repayment" element={<RepaymentCalendar />} />
              <Route path="/compare" element={<LoanComparison />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LoanProvider>
    </Router>
  );
}

export default App;