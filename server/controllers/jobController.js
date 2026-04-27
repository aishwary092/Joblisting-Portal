import Job from "../models/Job.js";

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json({success:true, jobs});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Get single job by ID
export const getJobById = async (req, res) => {
    try {
        const {id} = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.json({success:false, message:'Job not found'});
        }
        res.json({success:true, job});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Post a job
export const postJob = async (req, res) => {
    try {
        const {title, description, location, category, level, salary, company} = req.body;
        const recruiterId = req.body.userId; // Assuming userId from auth

        const jobData = {
            title,
            description,
            location,
            category,
            level,
            salary,
            company,
            recruiterId
        };

        const job = new Job(jobData);
        await job.save();

        res.json({success:true, job});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Get jobs by recruiter
export const getJobsByRecruiter = async (req, res) => {
    try {
        const {recruiterId} = req.params;
        const jobs = await Job.find({recruiterId});
        res.json({success:true, jobs});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}