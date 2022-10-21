const express = require('express');
const activityController = require('../controllers/activity');

const router = express.Router();

router.post('/', activityController.createActivity);

router.get('/', activityController.getAllActivites);

router.get('/:id', activityController.getDetailActivity);

router.patch('/:id', activityController.updateActivity);

router.delete("/:id", activityController.deleteActivity);

module.exports = router;