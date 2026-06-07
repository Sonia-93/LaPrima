const express = require("express");
const { authenticate } = require("../authentication_Mongo/middleware/auth.middleware");
const {
  getAllOrders,
  getOrderById,
  getOrderByStatus,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const router = express.Router();
router.get("/orders/status/:status", getOrderByStatus);
router.get("/orders/:id", getOrderById);
router.get("/orders", getAllOrders);
router.post("/orders", authenticate, addOrder);
router.patch("/orders/:id", authenticate, updateOrder);
router.delete("/orders/:id", authenticate, deleteOrder);

module.exports = router;

