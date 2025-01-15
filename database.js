const mongoose = require("mongoose"); // Corrected typo in 'moongose'
const Schema = mongoose.Schema;

// Database connection
mongoose
  .connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("The database is active");
  })
  .catch((err) => {
    console.error("Error in database connection:", err);
  });

// Schemas
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  adharId: { type: String },
});

const contractorSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  mobileno: { type: Number, required: true },
});

// Models
const userModel = mongoose.model("User", userSchema);
const contractorModel = mongoose.model("Contractor", contractorSchema);

// Exporting models
module.exports = {
  userModel,
  contractorModel,
};