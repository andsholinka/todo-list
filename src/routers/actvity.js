const express = require('express');
const activityController = require('../controllers/activity');
const { runValidation, createActivity } = require('../validation');

const router = express.Router();

router.post('/', createActivity, runValidation, activityController.createActivity);

router.get('/', activityController.getAllActivites);

router.get('/:id', activityController.getDetailActivity);

router.patch('/:id', activityController.updateActivity);

router.delete("/:id", activityController.deleteActivity);

module.exports = router;