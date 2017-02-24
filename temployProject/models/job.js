const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const jobSchema = new Schema({
    jobTitle: String,
    jobDescription: String,
    jobCategory: String,
    jobDeadline: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    temployer: { type: Schema.Types.ObjectId, ref: 'User' },
});
    jobSchema.set('timestamps', true);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
