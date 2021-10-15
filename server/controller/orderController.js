const Order = require('../models/OrderModel');

// get all orders
exports.getAllOrders = async (req, res) => {
  const allOrders = await Order.find({});

  res.status(200);
  res.json({ data: allOrders });
};

// get one order
exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const singleOrder = await Order.findOne({ id });
    res.status(200);
    res.json({ data: singleOrder });
  } catch (error) {
    return error;
  }
};

// add new order
exports.addNewOrder = async (req, res) => {
  try {
    const {
      product, sent, totalCost, deliveryCost,
    } = req.body;

    const order = new Order({
      product,
      sent,
      totalCost,
      deliveryCost,
    });

    await order.save();
    res.status(201);
    res.json({ data: order });
  } catch (error) {
    return error;
  }
};
// update order
exports.uppdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, sent } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { product, sent },
      { new: true });

    res.status(200);
    res.json({ data: updatedOrder });
  } catch (error) {
    return error;
  }
};
// delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteddOrder = await Order.findByIdAndDelete(id);

    res.status(204);
    res.json({ data: deleteddOrder });
  } catch (error) {
    return error;
  }
};
