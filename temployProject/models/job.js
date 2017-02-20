const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const jobSchema = new Schema({
    jobTitle: String,
    jobDescription: String,
    jobCategory: String,
    }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
