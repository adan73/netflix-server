const express = require('express');
const router = express.Router();
const { register, login , addToMyList , getUserMyList} = require('../controllers/userController');

router.post('/', register);
router.post('/login', login);
router.post('/:_id', addToMyList);
router.get('/:userId', getUserMyList);

module.exports = router;
