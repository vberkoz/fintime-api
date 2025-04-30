const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Create a new activity
router.post('/', activityController.createActivity);

// Get an activity by PK and SK
router.get('/:pk/:sk', activityController.getActivity);

// Get all activities for a specific day
router.get('/:userId/day/:endDate', activityController.getActivitiesForDay);

// Delete an activity by PK and activity endDate
router.delete('/:userId/day/:endDate', activityController.deleteActivity);

module.exports = router;