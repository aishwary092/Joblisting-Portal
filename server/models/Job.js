import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    location: {type:String, required:true},
    category: {type:String, required:true},
    level: {type:String, required:true},
    salary: {type:Number, required:true},
    company: {
        name: {type:String, required:true},
        logo: {type:String},
        description: {type:String}
    },
    recruiterId: {type:String, required:true}, // Clerk user ID
    createdAt: {type:Date, default:Date.now}
})

const Job = mongoose.model("job",jobSchema)

export default Job;