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
  const singleOrder = await Order.findOne({ _id: id });
  res.status(200).json({ data: singleOrder });
});

// update order
exports.uppdateOrder = wrapAsync(async (req, res) => {
  console.log('hej');
  const { id } = req.params;
  const { status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(id, { status },
    { new: true });

  res.status(200).json({ data: updatedOrder });
});
// delete order
exports.deleteOrder = wrapAsync(async (req, res) => {
  const { id } = req.params;

  await Order.findByIdAndDelete(id);

  res.status(204).end();
});
