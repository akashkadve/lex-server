import { Home } from "../Models/HomeModel.js";

// Create a new entry
export const createHomeEntry = async (req, res) => {
  try {
    const { fullName, phone, areaOfPractice, query } = req.body;
    const newEntry = new Home({ fullName, phone, areaOfPractice, query });
    await newEntry.save();
    res.status(201).json({ message: "Entry created successfully", newEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
