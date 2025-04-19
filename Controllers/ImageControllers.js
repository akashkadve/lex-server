import express from "express";
import { LexLogo } from "../Models/ImageModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadLexLogo = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Image is required" });
  }
  const { photo } = req.files;
  const allowedFormats = [
    "image/jpeg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  if (!allowedFormats.includes(photo.mimetype)) {
    return res
      .status(400)
      .json({ message: "Invalid photo format. Only JPG and PNG are allowed." });
  }
  if (!photo) {
    return res.status(400).json({ message: "Please add photo" });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
  }

  const newPhoto = new LexLogo({
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });
  await newPhoto.save();
  if (newPhoto) {
    res.status(201).json({ message: "photo added successfully", newPhoto });
  }
};

//get All
export const getAllLexLogo = async (req, res) => {
  try {
    const certificateData = await LexLogo.find();
    if (!certificateData) {
      return res.status(404).json({ message: "Certificate data not found" });
    }
    res.status(200).json(certificateData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
