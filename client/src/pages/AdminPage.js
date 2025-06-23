import { useState } from 'react';
import { deleteBill } from '../services/api';

const AdminPage = ({ bills }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBills = bills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

  const handleDelete = async (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        await deleteBill(billId);
        alert('Bill deleted successfully');
        window.location.reload(); // Refresh to update the list
      } catch (error) {
        console.error('Error deleting bill:', error);
        alert('Error deleting bill');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stats">
        <p>Total Bills: {bills.length}</p>
        <p>Total Revenue: ₹{
          bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0).toFixed(2)
        }</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map(bill => (
            <tr key={bill._id}>
              <td>{formatDate(bill.date || bill.createdAt)}</td>
              <td>{bill.customerName}</td>
              <td>
                {bill.products.length} items
                <div className="product-details">
                  {bill.products.map((product, i) => (
                    <div key={i}>
                      {product.product} - {product.category} 
                      (Qty: {product.quantity}, ₹{product.price}, Disc: {product.discount}%)
                    </div>
                  ))}
                </div>
              </td>
              <td>{bill.paymentMethod}</td>
              <td>₹{bill.totalAmount.toFixed(2)}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(bill._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;