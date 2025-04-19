import { User } from "../Models/Models.js";

//post
const create = async (req, res) => {
  try {
    const UserData = new User(req.body);
    if (!UserData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const savedData = await UserData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default create;
