import express from "express";
import { createHomeEntry } from "../Controllers/HomeController.js";
const HomeRoute = express.Router();
HomeRoute.post("/createHomeEntry", createHomeEntry);

export default HomeRoute;
