import express from "express";
import { addInternships } from "../Controllers/Internships.controller.js";

const addInternshipsRoute = express.Router();
addInternshipsRoute.post("/create_addInternships", addInternships);

export default addInternshipsRoute;
