import mongoose from "mongoose";

const LexLogoSchema = new mongoose.Schema({
  photo: {
    public_id: {
      type: "String",
      required: true,
    },
    url: {
      type: "String",
      required: true,
    },
  },
});

export const LexLogo = mongoose.model("LexLogo", LexLogoSchema);
