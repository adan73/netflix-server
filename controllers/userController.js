const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, phone, password, role } = req.body;

  try {
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

const login = async (req, res) => {
  const { phone , email, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ phone }, { email }] });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Try again.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'wrong password, try again' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id  });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

module.exports = {
  register,
  login,
};
