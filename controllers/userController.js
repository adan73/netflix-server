const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Movies = require('../models/Movies');

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
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, userId: newUser._id  });
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

    res.json({ token, userId: user._id  ,role: user.role});
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

const addToMyList = async (req, res) => {
  const moviesId = req.params._id;
  const { userId } = req.body;

  if (!userId || !moviesId) {
    return res.status(400).json({ message: 'Missing userId or moviesId' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.myList.includes(moviesId)) {
      return res.status(200).json({ message: 'Already in My List' });
    }

    user.myList.push(moviesId);
    await user.save();

    res.status(200).json({ message: 'Added to My List', myList: user.myList });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const removeFromMyList = async (req, res) => {
  const moviesId = req.params._id;
  const { userId } = req.body;

  if (!userId || !moviesId) {
    return res.status(400).json({ message: 'Missing userId or moviesId' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.myList.includes(moviesId)) {
      return res.status(200).json({ message: 'Movie/Show not found in My List' });
    }

    user.myList = user.myList.filter(id => id.toString() !== moviesId);
    await user.save();

    res.status(200).json({ message: 'Removed from My List', myList: user.myList });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getUserMyList = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const myListContent = await Movies.find({ _id: { $in: user.myList } });

    res.status(200).json(myListContent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get My List', error: err.message });
  }
};
module.exports = {
  register,
  login,
  addToMyList,
  getUserMyList,
  removeFromMyList,
};
