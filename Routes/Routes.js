import express from "express";
import userSchema from "../validate/validations.js";
import validator from "../validate/validator.js";
import { create } from "../Controllers/controllers.js";

const route = express.Router();
route.post("/create", validator(userSchema), create);

export default route;
