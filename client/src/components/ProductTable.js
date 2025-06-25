import React from 'react';

const ProductTable = ({ products, onRemove }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product Type</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.type}</td>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.discount}%</td>
            <td>₹{(product.price * product.quantity * (1 - product.discount / 100)).toFixed(2)}</td>
            <td>
              <button onClick={() => onRemove(index)}>Remove</button>
            </td>
          </tr>
        ))}
        {products.length === 0 && (
          <tr>
            <td>Select</td>
            <td>Select</td>
            <td>1</td>
            <td>0%</td>
            <td>0.00</td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;