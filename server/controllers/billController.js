import Bill from '../model/bill_schema.js';

export const createBill = async (req, res) => {
  try {
    const { customerName, products, totalAmount, paymentMethod } = req.body;
    if (!customerName || !products || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newBill = new Bill({ customerName, products, totalAmount, paymentMethod });
    await newBill.save();
    res.status(201).json({ message: "Bill added successfully", bill: newBill });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getBills = async (req, res) => {
  try {
    const { billId } = req.query;
    if (billId) {
      const bill = await Bill.findById(billId);
      if (!bill) return res.status(404).json({ message: "Bill not found" });
      return res.status(200).json({ message: "Bill found", bill });
    }
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json({ message: "Bill deleted successfully", bill: deletedBill });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};