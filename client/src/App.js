import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BillForm from './components/BillForm';
import './styles/BillForm.css'; 
import ViewBills from './components/ViewBills';
import './styles/ViewBills.css';
import AdminLogin from './components/AdminLogin';
import './styles/AdminLogin.css';
import Home from './components/Home';
import './styles/Home.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill" element={<BillForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/view" element={<ViewBills />} />
      </Routes>
    </Router>
  );
}

export default App;
