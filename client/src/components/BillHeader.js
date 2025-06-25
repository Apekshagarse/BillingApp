import React from 'react';

const BillHeader = ({ customerName, contactNo, onNameChange, onContactChange }) => {
  return (
    <div className="customer-info">
      <div className="info-field">
        <strong>Customer Name:</strong>
        <input 
          type="text" 
          value={customerName} 
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="info-field">
        <strong>Contact No:</strong>
        <input 
          type="text" 
          value={contactNo} 
          onChange={(e) => onContactChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BillHeader;