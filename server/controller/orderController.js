const Order = require('../models/OrderModel');

// get all orders
exports.getAllOrders = async (req, res) => {
  const allOrders = await Order.find({});

  res.status(200);
  res.json({ data: allOrders });
  console.log(allOrders);
};

// add new order
exports.addNewOrder = async (req, res) => {
  console.log(req.body);
  const { product, sent } = req.body;

  const order = new Order({
    product,
    sent,
  });

  await order.save();
  res.status(201);
  res.json({ data: order });
  console.log(order);
};
// update order
exports.uppdateOrder = async (req, res) => {
  console.log(req.body);
  const { product, sent } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { product, sent },
    { new: true });

  res.status(200);
  res.json({ data: updatedOrder });
  console.log(updatedOrder);
};
