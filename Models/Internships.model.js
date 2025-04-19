import mongoose from "mongoose";

const InternshipsSchema = new mongoose.Schema({
  type_of_internship: {
    type: String,
    required: true,
    enum: ["please Select", "Offline Internship", "Online Internship"],
    default: "please Select",
  },
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
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    validator: function (v) {
      const today = new Date();
      const minAge = 18;
      const birthDate = new Date(v);
      const age = today.getFullYear() - birthDate.getFullYear();
      return (
        age > minAge ||
        (age === minAge &&
          today >=
            new Date(birthDate.setFullYear(birthDate.getFullYear() + minAge)))
      );
    },
    message: (props) =>
      `${props.value} is not a valid date of birth! Users must be at least 18 years old.`,
  },

  address: {
    type: String,
    required: true,
  },
  educational: {
    type: String,
    required: true,
    enum: ["please Select", "Graduate Course", "Master Course"],
    default: "please Select",
  },
  area_of_practice: {
    type: String,
    required: true,
  },
  name_Of_collage: {
    type: String,
    required: true,
  },
  year_of_exp: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  other_qualification: {
    type: String,
    required: true,
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Internships = mongoose.model("Internships", InternshipsSchema);
