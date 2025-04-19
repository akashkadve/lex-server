import express from "express";
import { Area_Of_Practices } from "../Controllers/Area_Of_Practice.js";

const routes = express.Router();
routes.post("/create_Area_Of_Practices", Area_Of_Practices);

export default routes;
