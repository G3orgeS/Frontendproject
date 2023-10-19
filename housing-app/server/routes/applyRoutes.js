const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applyController');

router.post('/', applicationController.createApplication);
router.get('/:userId', applicationController.getApplicationsByUser);
router.put('/:applicationId', applicationController.updateApplicationStatus);

module.exports = router;
