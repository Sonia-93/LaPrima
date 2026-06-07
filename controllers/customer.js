const Customer = require('../models/customer');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addCustomer = async (req, res) => {
    try {
        const data = req.body;
        if (!data.joined) {
            data.joined = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        const newCustomer = new Customer(data);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Customer Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
