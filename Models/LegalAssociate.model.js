import mongoose from "mongoose";

const Legal_AssociateSchema = new mongoose.Schema({
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
  qualificationLevel: {
    type: String,
    required: true,
    enum: ["please Select", "Newly Qualified", "Experienced"],
    default: "please Select",
  },
  current_or_prevOrg: {
    type: String,
    required: true,
  },
  year_of_exp: {
    type: String,
    required: true,
  },
  current_designation: {
    type: String,
    required: true,
  },
  area_of_practice: {
    type: String,
    required: true,
  },
  collage_of_graduation: {
    type: String,
    required: true,
  },
  graduation_year: {
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

export const Legal_Associate = mongoose.model(
  "Legal_Associate",
  Legal_AssociateSchema
);
