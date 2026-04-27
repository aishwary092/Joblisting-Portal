import express from 'express';
import { applyJob, getApplications, getUserApplications, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

// Apply for job
router.post('/apply', applyJob);

// Get applications for a job
router.get('/job/:jobId', getApplications);

// Get user's applications
router.get('/user/:userId', getUserApplications);

// Update application status
router.put('/:id', updateApplicationStatus);

export default router;