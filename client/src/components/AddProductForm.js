import React, { useState } from 'react';

const AddProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({
    type: '',
    name: '',
    price: 0,
    quantity: 1,
    discount: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    setProduct({
      type: '',
      name: '',
      price: 0,
      quantity: 1,
      discount: 0
    });
  };

  return (
    <div className="add-product-section">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <select 
          value={product.type} 
          onChange={(e) => setProduct({...product, type: e.target.value})}
          required
        >
          <option value="">Select Product Type</option>
          <option value="Grocery">Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select 
          value={product.name} 
          onChange={(e) => setProduct({...product, name: e.target.value})}
          required
        >
          <option value="">Select Product</option>
          <option value="Rice">Rice</option>
          <option value="Oil">Oil</option>
          <option value="Mobile">Mobile</option>
        </select>

        <input 
          type="number" 
          placeholder="Price" 
          value={product.price} 
          onChange={(e) => setProduct({...product, price: parseFloat(e.target.value) || 0})}
          required
        />

        <input 
          type="number" 
          placeholder="Quantity" 
          value={product.quantity} 
          onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value) || 1})}
          min="1"
          required
        />

        <input 
          type="number" 
          placeholder="Discount %" 
          value={product.discount} 
          onChange={(e) => setProduct({...product, discount: parseFloat(e.target.value) || 0})}
          min="0"
          max="100"
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;