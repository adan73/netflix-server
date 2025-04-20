const express = require('express');
const router = express.Router();
const { register, login , addToMyList , getUserMyList,removeFromMyList,updateUser, deleteUser} = require('../controllers/userController');

router.post('/', register);
router.post('/login', login);
router.post('/:_id', addToMyList);
router.get('/:userId', getUserMyList);
router.delete('/:_id', removeFromMyList);
router.put('/:id', updateUser);
router.delete('/:id/user', deleteUser);
module.exports = router;
