const express = require('express');
const router = new express.Router();

const activityRouter = require('./actvity')
const todoRouter = require('./todo')

router.use('/activity-groups', activityRouter)
router.use('/todo-items', todoRouter)

module.exports = router;