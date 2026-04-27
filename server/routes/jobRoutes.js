import express from 'express';
import { getJobs, getJobById, postJob, getJobsByRecruiter } from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs
router.get('/', getJobs);

// Get single job
router.get('/:id', getJobById);

// Post a job
router.post('/', postJob);

// Get jobs by recruiter
router.get('/recruiter/:recruiterId', getJobsByRecruiter);

export default router;