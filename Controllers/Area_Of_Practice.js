import { Area_Of_Practice } from "../Models/Areas_of_Practice.js";

//post
export const Area_Of_Practices = async (req, res) => {
  try {
    const Area_Of_PracticeData = new Area_Of_Practice(req.body);
    if (!Area_Of_PracticeData) {
      return res.status(404).json({ msg: "Area Of Practice data not found" });
    }
    const savedData = await Area_Of_PracticeData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
