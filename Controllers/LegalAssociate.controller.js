import { sendMail } from "../mail/sendMail.js";
import { Legal_Associate } from "../Models/LegalAssociate.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addLegalAssociate = async (req, res) => {
  try {
    // Check if a profile image is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const { profileImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(profileImage.mimetype)) {
      return res.status(400).json({
        message:
          "Invalid profile image format. Only JPG, PNG, and WEBP are allowed.",
      });
    }

    // Destructure required fields from request body
    const {
      fullName,
      phone,
      email,
      dob,
      address,
      qualificationLevel,
      current_or_prevOrg,
      year_of_exp,
      current_designation,
      area_of_practice,
      collage_of_graduation,
      graduation_year,
      degree,
      other_qualification,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !phone ||
      !email ||
      !dob ||
      !address ||
      !qualificationLevel ||
      !current_or_prevOrg ||
      !year_of_exp ||
      !current_designation ||
      !area_of_practice ||
      !collage_of_graduation ||
      !graduation_year ||
      !degree ||
      !other_qualification ||
      !profileImage
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      profileImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({ message: "Error uploading image" });
    }

    // Create new Legal Associate object
    const newAssociate = {
      fullName,
      phone,
      email,
      dob,
      address,
      qualificationLevel,
      current_or_prevOrg,
      year_of_exp,
      current_designation,
      area_of_practice,
      collage_of_graduation,
      graduation_year,
      degree,
      other_qualification,
      profileImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    // Save to database
    const legalAssociate = await Legal_Associate.create(newAssociate);
    await sendMail(
      email,
      "Welcome to Lex Credence",
      `Hi ${fullName}, welcome to Lex Credence!
    
      Here are your details:
      - Full Name: ${fullName}
      - Phone: ${phone}
      - Email: ${email}
      - Date of Birth: ${dob}
      - Address: ${address}
      - Qualification Level: ${qualificationLevel}
      - Current/Previous Organization: ${current_or_prevOrg}
      - Years of Experience: ${year_of_exp}
      - Current Designation: ${current_designation}
      - Area of Practice: ${area_of_practice}
      - College of Graduation: ${collage_of_graduation}
      - Graduation Year: ${graduation_year}
      - Degree: ${degree}
      - Other Qualification: ${other_qualification}
      - Profile Image: ${cloudinaryResponse.url}
    
      Regards,
      Lex Credence Team`,

      `<h2>Hi ${fullName},</h2>
      <p>Welcome to <b>Lex Credence</b>. We are excited to have you onboard!</p>
      <h3>Your Details:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Date of Birth:</strong> ${dob}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Qualification Level:</strong> ${qualificationLevel}</li>
        <li><strong>Current/Previous Organization:</strong> ${current_or_prevOrg}</li>
        <li><strong>Years of Experience:</strong> ${year_of_exp}</li>
        <li><strong>Current Designation:</strong> ${current_designation}</li>
        <li><strong>Area of Practice:</strong> ${area_of_practice}</li>
        <li><strong>College of Graduation:</strong> ${collage_of_graduation}</li>
        <li><strong>Graduation Year:</strong> ${graduation_year}</li>
        <li><strong>Degree:</strong> ${degree}</li>
        <li><strong>Other Qualification:</strong> ${other_qualification}</li>
      </ul>
      <h3>Profile Image:</h3>
      <p><img src="${cloudinaryResponse.url}" alt="Profile Image" style="width:200px; height:auto; border-radius:10px;"></p>
      <p>If the image does not load, click <a href="${cloudinaryResponse.url}">here</a> to view it.</p>
      <p>Best Regards,</p>
      <p><b>Lex Credence Team</b></p>`
    );

    res
      .status(201)
      .json({ message: "Legal Associate added successfully", legalAssociate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
