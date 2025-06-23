import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BillingPage from './pages/BillingPage';
import AdminPage from './pages/AdminPage';
import { saveBill, getBills } from './services/api';
import './styles/billStyles.css';

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getBills();
        setBills(data);
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      }
    };
    fetchBills();
  }, []);

  const handleSaveBill = async (billData) => {
    try {
      const savedBill = await saveBill(billData);
      setBills([savedBill, ...bills]);
      alert('Bill saved successfully!');
    } catch (error) {
      console.error('Error saving bill:', error);
      alert('Error saving bill');
    }
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Billing</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <BillingPage onSave={handleSaveBill} />
          } />
          <Route path="/admin" element={
            <AdminPage bills={bills} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;