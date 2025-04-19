import mongoose from "mongoose";

const Area_Of_PracticeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Regex to check exactly 10 digits
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone numbers must be 10 digits.`,
    },
  },
  message: {
    type: String,
    required: true,
  },
});

export const Area_Of_Practice = mongoose.model(
  "Area_Of_Practice",
  Area_Of_PracticeSchema
);
