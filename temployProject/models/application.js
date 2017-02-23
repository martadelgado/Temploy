const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const applicationSchema = new Schema({
    user: { type: String, ref: "User" },
    job: { type: String, ref: "Job" }
});
    applicationSchema.set('timestamps', true);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
