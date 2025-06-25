import React from 'react';

const PaymentOptions = ({ totalAmount }) => {
  return (
    <div className="payment-section">
      <h3>Payment Method:</h3>
      <div className="payment-options">
        <button>Cash</button>
        <button>Save Bill</button>
      </div>
      <div className="total-amount">
        <strong>Total Amount: ₹{totalAmount}</strong>
      </div>
      <div className="action-buttons">
        <button className="admin-btn">Go to Admin Page</button>
        <button className="settings-btn">Activate Windows</button>
        <span className="windows-note">Go to Settings to activate Windows.</span>
      </div>
    </div>
  );
};

export default PaymentOptions;