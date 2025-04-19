import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
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
  areaOfPractice: {
    type: String,
    required: true,
    enum: [
      "please Select",
      "Litigation",
      "Corporate and Commercial",
      "Alternate Dispute Resolution",
      "Drafting and Conveyancing",
      "Family Law and Wealth Advisory",
      "Renewable Energy",
      "Intellectual Property",
      "Banking and Finance",
      "Real Estate",
      "Consumer",
      "Healthcare and Medical",
      "Private Equity",
      "Environment",
      "Bankruptcy and Insolvency",
      "Information Technology and Cyber Law",
      "Other",
    ],
    default: "please Select",
  },

  query: {
    type: String,
    required: true,
  },
});

export const Home = mongoose.model("Home", HomeSchema);
