const express = require('express');
const courseRouter = require('./courseRouter');
const authorRouter = require('./authorRouter');
const authRouter = require('./authRouter');

const router = express();

router.use('/courses', courseRouter);
router.use('/authors', authorRouter);
router.use('/auth', authRouter);

module.exports = router;
