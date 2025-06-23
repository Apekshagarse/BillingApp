import { useState } from 'react';

const BillForm = ({ onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [products, setProducts] = useState([{
    productType: '',
    product: '',
    price: 0,
    quantity: 1,
    discount: 0,
    total: 0
  }]);

  const productData = {
            Frames: {
                "Adivasi Geographic by Jayesh Lakhama Vayeda":500,
                "Anti-caste Bookseller by Nidhin Shobhana":500,
                "Anti-Caste Movement is a Verb by Nidhin Shobhana":500,
                "Atta Deep Bhav by Buddhist Cultural Art":500,
                "Atta hi Attano Natho by Buddhist Cultural Art":500,
                "Attasila Samadanam by Buddhist Cultural Art":500,
                "Babasaheb and the Dhamma by Priyanka Rohan Patil":500,
                "Babasaheb by Sonali Meshram":500,
                "Babasaheb gave us the Path by Priyanka Rohan Patil":500,
                "Babasaheb, champion of women’s rights by Priyanka Rohan Patil":500,
                "Beauty by Kshitij Mahendra":500,
                "Bhima Koregaon: Our War Cry!":500,
                "Buddha at the Jetavana by Priyanka Rohan Patil":500,
                "Buddha by Sonali Meshram":500,
                "Dhamek Stupa by Sushil Patil":500,
                "Dr. B. R. Ambedkar by Priyanka Rohan Patil":500,
                "Freedom by Kshitij Mahendra":500,
                "In Quest of Equality by The Shared Mirror":500
            },
            Tshirt: {
                "Elephant": 200, 
                "Chameleon": 200, 
                "Lion Cub": 200, 
                "Lioness": 200, 
                "Sitting Baby Wolf": 200, 
                "Wolf Standing": 200
            },
            Bags: {
                "Black Rexin Bag": 200, 
                "Brown Rexin Bag": 200, 
                "Bottle Bag": 200,
                "Blue Butterfly (Big Bag)": 200, 
                "Red Big Flower (Big Bag)": 200,
                "Blue Butterfly (Small Bag)": 200, 
                "Red Big Flower (Small Bag)": 200
            },
            Books :{
                "Cast & Class":500, 
                "Ews":500, 
                "Gujrati":500, 
                "In Quest of Equality by The Shared Mirror":500, 
                "Mahad":500, 
                "Hatred In The Belly by The Shared Mirror":500, 
                "Bhima Koregaon":500, 
                "The River Speaks":500, 
                "What Babasaheb Ambedkar Means":500, 
                "Navayana Buddhism":500, 
                "A Dyslexic's Life":500, 
                "Kanshi Ram Ji Ki Sohbat Mein":500, 
                "Mai Kanshi Ram Bol Raha Hu":500, 
                "Savari":500
            },
            Mugs : {
                "Elephant": 200, 
                "Chameleon": 200, 
                "Lion Cub": 200, 
                "Lioness": 200, 
                "Sitting Baby Wolf": 200, 
                "Wolf Standing": 200
            },
            Prints : {
                "Adivasi Geographic by Jayesh Lakhama Vayeda":500,
                "Anti-caste Bookseller by Nidhin Shobhana":500,
                "Anti-Caste Movement is a Verb by Nidhin Shobhana":500,
                "Atta Deep Bhav by Buddhist Cultural Art":500,
                "Atta hi Attano Natho by Buddhist Cultural Art":500,
                "Attasila Samadanam by Buddhist Cultural Art":500,
                "Babasaheb and the Dhamma by Priyanka Rohan Patil":500,
                "Babasaheb by Sonali Meshram":500,
                "Babasaheb gave us the Path by Priyanka Rohan Patil":500,
                "Babasaheb, champion of women’s rights by Priyanka Rohan Patil":500,
                "Beauty by Kshitij Mahendra":500,
                "Bhima Koregaon: Our War Cry!":500,
                "Buddha at the Jetavana by Priyanka Rohan Patil":500,
                "Buddha by Sonali Meshram":500,
                "Dhamek Stupa by Sushil Patil":500,
                "Dr. B. R. Ambedkar by Priyanka Rohan Patil":500,
                "Freedom by Kshitij Mahendra":500,
                "In Quest of Equality by The Shared Mirror":500
            }
        };

  const addProductRow = () => {
    setProducts([...products, {
      productType: '',
      product: '',
      price: 0,
      quantity: 1,
      discount: 0,
      total: 0
    }]);
  };

  const deleteRow = (index) => {
    if (products.length > 1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }
  };

  const handleProductTypeChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      productType: value,
      product: '',
      price: 0,
      total: 0
    };
    setProducts(newProducts);
  };

  const handleProductChange = (index, value) => {
    const newProducts = [...products];
    const productType = newProducts[index].productType;
    const price = productData[productType]?.[value] || 0;
    
    newProducts[index] = {
      ...newProducts[index],
      product: value,
      price: price,
      total: price * newProducts[index].quantity * (1 - (newProducts[index].discount/100))
    };
    setProducts(newProducts);
  };

  const handleQuantityChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      quantity: parseInt(value) || 0,
      total: newProducts[index].price * parseInt(value) * (1 - (newProducts[index].discount/100))
    };
    setProducts(newProducts);
  };

  const handleDiscountChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      discount: parseInt(value) || 0,
      total: newProducts[index].price * newProducts[index].quantity * (1 - (parseInt(value)/100))
    };
    setProducts(newProducts);
  };

  const calculateGrandTotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billData = {
      customerName,
      mobileNumber,
      products: products.map(p => ({
        product: p.productType === 'Tshirt' ? 'T-shirts' : p.productType,
        category: p.product,
        price: p.price,
        quantity: p.quantity,
        discount: p.discount,
        total: p.total
      })),
      totalAmount: calculateGrandTotal(),
      paymentMethod
    };
    
    onSave(billData);
  };

  return (
    <div className="bill-container">
      <form onSubmit={handleSubmit}>
        {/* Customer Info */}
        <div className="customer-info">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            required
          />
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
          />
        </div>

        {/* Product Rows */}
        {products.map((product, index) => (
          <div key={index} className="product-row">
            <select
              value={product.productType}
              onChange={(e) => handleProductTypeChange(index, e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Frames">Frames</option>
              <option value="Tshirt">Tshirt</option>
              <option value="Bags">Bags</option>
            </select>

            <select
              value={product.product}
              onChange={(e) => handleProductChange(index, e.target.value)}
              required
              disabled={!product.productType}
            >
              <option value="">Select Product</option>
              {product.productType && Object.keys(productData[product.productType]).map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input
              type="number"
              value={product.price}
              readOnly
            />

            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              min="1"
              required
            />

            <select
              value={product.discount}
              onChange={(e) => handleDiscountChange(index, e.target.value)}
            >
              <option value="0">0%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
            </select>

            <input
              type="number"
              value={product.total.toFixed(2)}
              readOnly
            />

            <button type="button" onClick={() => deleteRow(index)}>×</button>
          </div>
        ))}

        <button type="button" onClick={addProductRow}>Add Product</button>

        {/* Payment Method */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>

        {/* Total Amount */}
        <div className="total-amount">
          Total Amount: ₹{calculateGrandTotal().toFixed(2)}
        </div>

        <button type="submit">Save Bill</button>
      </form>
    </div>
  );
};

export default BillForm;