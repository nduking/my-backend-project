const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define what a user looks like in our database

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true, //Automatically adds createdAt and updatedAt
  }
);

//Hash password before saving to the database
userSchema.pre("save", async function (next) {
  //Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
