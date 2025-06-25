import React, { useState } from 'react';
import BillHeader from './components/BillHeader';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import PaymentOptions from './components/PaymentOptions';
import './styles/billStyles.css';
import './styles/tableStyles.css';

function App() {
  const [customerName, setCustomerName] = useState('Enter Customer Name');
  const [contactNo, setContactNo] = useState('Enter mobile Number');
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  const calculateTotal = (productsList) => {
    const total = productsList.reduce((sum, product) => {
      return sum + (product.price * product.quantity * (1 - product.discount / 100));
    }, 0);
    setTotalAmount(total.toFixed(2));
  };

  return (
    <div className="bill-container">
      <h1 className="bill-title">SANGHAMITRA BILL</h1>
      
      <BillHeader 
        customerName={customerName}
        contactNo={contactNo}
        onNameChange={setCustomerName}
        onContactChange={setContactNo}
      />
      
      <ProductTable 
        products={products} 
        onRemove={removeProduct} 
      />
      
      <AddProductForm onAdd={addProduct} />
      
      <PaymentOptions totalAmount={totalAmount} />
    </div>
  );
}

export default App;