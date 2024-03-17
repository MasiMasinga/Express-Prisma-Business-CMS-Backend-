const express = require('express');
const userController = require('../../controllers/user');
const router = express.Router();

const auth = require('../../middleware/auth');

router.get('/profile/name/:id', auth, userController.updateName);
router.put('/profile/email/:id', auth, userController.updateEmail);
router.put('/profile/password/:id', auth, userController.updatePassword);
router.delete('/profile/:id', auth, userController.deleteUser);

module.exports = router;
