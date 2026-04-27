import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {type:String, required:true},
    userId: {type:String, required:true}, // Clerk user ID
    userName: {type:String, required:true},
    userEmail: {type:String, required:true},
    userResume: {type:String},
    status: {type:String, default:'pending'}, // pending, accepted, rejected
    appliedAt: {type:Date, default:Date.now}
})

const Application = mongoose.model("application",applicationSchema)

export default Application;