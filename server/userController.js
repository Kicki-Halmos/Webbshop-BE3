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

exports.update = async (req, res) => {
  try {
    const {
      fullName, email, password, phoneNumber, address,
    } = req.body;
    const user = await User.findOneAndUpdate(req.params.id, {
      fullName, email, password, phoneNumber, address,
    }, { new: true });
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json('need to fill in email and password');
    }
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.json('email or password incorrect');
    }
    return res.json({ user });
  } catch (error) {
    return console.log(error);
  }
};
