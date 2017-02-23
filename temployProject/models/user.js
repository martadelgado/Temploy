const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  	username: String,
  	password: String,
    name: String,
    lastName: String,
    dateOfBirth: Date,
    isTemployer: { type: Boolean, default: false },
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
