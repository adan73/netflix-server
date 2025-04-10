const Avatar = require('../models/Avatars');

const getAvatarsByUser = async (req, res) => {
  try {
    const avatars = await Avatar.find({ userId: req.params.userId });
    res.json(avatars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching avatars', error: err });
  }
};

const createAvatar = async (req, res) => {
  try {
    const { name, avatar, userId } = req.body;
    const newAvatar = new Avatar({ name, avatar, userId });
    await newAvatar.save();
    res.status(201).json(newAvatar);
  } catch (err) {
    res.status(500).json({ message: 'Error creating avatar', error: err });
  }
};

const updateAvatarName = async (req, res) => {
  try {
    const updated = await Avatar.findByIdAndUpdate(req.params.id,{ name: req.body.name },{ new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating avatar', error: err });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    await Avatar.findByIdAndDelete(req.params.id);
    res.json({ message: 'Avatar deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting avatar', error: err });
  }
};

module.exports = {getAvatarsByUser,createAvatar,updateAvatarName,deleteAvatar,};
