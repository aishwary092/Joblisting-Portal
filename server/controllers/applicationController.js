import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const {jobId, userId} = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.json({success:false, message:'User not found'});
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.json({success:false, message:'Job not found'});
        }

        // Check if already applied
        const existingApplication = await Application.findOne({jobId, userId});
        if (existingApplication) {
            return res.json({success:false, message:'Already applied'});
        }

        const applicationData = {
            jobId,
            userId,
            userName: user.name,
            userEmail: user.email,
            userResume: user.resume
        };

        const application = new Application(applicationData);
        await application.save();

        res.json({success:true, application});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Get applications for a job (by recruiter)
export const getApplications = async (req, res) => {
    try {
        const {jobId} = req.params;
        const applications = await Application.find({jobId});
        res.json({success:true, applications});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Get applications by user
export const getUserApplications = async (req, res) => {
    try {
        const {userId} = req.params;
        const applications = await Application.find({userId});
        res.json({success:true, applications});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// Update application status
export const updateApplicationStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const application = await Application.findByIdAndUpdate(id, {status}, {new:true});
        if (!application) {
            return res.json({success:false, message:'Application not found'});
        }

        res.json({success:true, application});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}