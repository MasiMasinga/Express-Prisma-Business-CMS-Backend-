const express = require('express');
const authController = require('../../controllers/auth');
const router = express.Router();

const auth = require('../../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', auth, authController.logout);

module.exports = router;