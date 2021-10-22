const Order = require('../models/OrderModel');
const wrapAsync = require('../utils/wrapAsync');

// get all orders
exports.getAllOrders = wrapAsync(async (req, res) => {
  const allOrders = await Order.find({});

  res.status(200).json({ data: allOrders });
});

// get one order
exports.getSingleOrder = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const singleOrder = await Order.findOne({ id });
  res.status(200).json({ data: singleOrder });
});

// add new order
exports.addNewOrder = wrapAsync(async (req, res) => {
  const {
    products, totalCost, deliveryCost,
  } = req.body;

  const userId = req.user.id;

  const order = await new Order({
    products,
    totalCost,
    deliveryCost,
    userId,
  });

  order.save();
  res.status(201).json({ data: order });
});
// update order
exports.uppdateOrder = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { product, status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(id, { product, status },
    { new: true });

  res.status(200).json({ data: updatedOrder });
});
// delete order
exports.deleteOrder = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(id);

  res.status(204).json({ data: deletedOrder });
});
