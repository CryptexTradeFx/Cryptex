const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["buy", "sell"], required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

// Create order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders (admin only)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "username");
        res.json(orders);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
