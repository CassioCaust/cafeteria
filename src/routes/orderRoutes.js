const express = require("express");
const Order = require("./models/Order");
const Product = require("./models/Product");
const router = express.Router();

// Criar um novo pedido
router.post("/", async (req, res) => {
  try {
    const { customerName, items } = req.body;

    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Product with ID ${item.product} not found`);
      total += product.price * item.quantity;
    }

    const order = await Order.create({ customerName, items, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os pedidos
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar o status de um pedido
router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um pedido
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
