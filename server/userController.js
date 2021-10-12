const User = require('./models/User');

exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    return res.json({ user });
  } catch (error) {
    return console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const {
      fullName, email, password, phoneNumber, address,
    } = req.body;
    const newUser = new User({
      fullName, email, password, phoneNumber, address,
    });
    await newUser.save();
    return res.json({ newUser });
  } catch (error) {
    return console.log(error);
  }
};
