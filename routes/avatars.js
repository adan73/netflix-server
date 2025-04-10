const express = require('express');
const router = express.Router();
const {getAvatarsByUser,createAvatar,updateAvatarName,deleteAvatar} = require('../controllers/avatarController');

router.get('/:userId', getAvatarsByUser);
router.post('/', createAvatar);
router.put('/:id', updateAvatarName);
router.delete('/:id', deleteAvatar);

module.exports = router;
