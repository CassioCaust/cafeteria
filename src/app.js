const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão ao MongoDB
connectDB();

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
