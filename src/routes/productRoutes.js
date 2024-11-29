const express = require("express");
const Product = require("./models/Product.js");
const router = express.Router();

// Adicionar um novo produto
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um produto
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um produto
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
