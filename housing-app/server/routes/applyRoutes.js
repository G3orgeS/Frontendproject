const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applyController');

router.post('/createApplication', applicationController.createApplication);
router.get('/:username', applicationController.getApplicationsByUser);
router.put('/:applicationId', applicationController.updateApplicationStatus);
router.get('/', applicationController.getAllApplications);

module.exports = router;
