import { useState } from 'react';
import { saveBill } from '../services/api'; // Fixed import

function BillingPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    products: [],
    totalAmount: 0,
    paymentMethod: 'Cash'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveBill(formData); // Fixed function call
      console.log('Bill created:', response.data);
      alert('Bill saved successfully!');
      // Reset form after successful submission
      setFormData({
        customerName: '',
        products: [],
        totalAmount: 0,
        paymentMethod: 'Cash'
      });
    } catch (error) {
      console.error('Error saving bill:', error);
      alert('Failed to save bill');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs here */}
      <button type="submit">Save Bill</button>
    </form>
  );
}

export default BillingPage;