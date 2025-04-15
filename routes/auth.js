const express = require('express');
const router = express.Router();
const { register, login , addToMyList , getUserMyList,removeFromMyList} = require('../controllers/userController');

router.post('/', register);
router.post('/login', login);
router.post('/:_id', addToMyList);
router.get('/:userId', getUserMyList);
router.delete('/:_id', removeFromMyList);

module.exports = router;
