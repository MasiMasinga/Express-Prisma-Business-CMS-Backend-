const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const cmsRoutes = require('./cms');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/cms', cmsRoutes);

module.exports = router;