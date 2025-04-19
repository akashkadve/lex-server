import express from "express";
import {
  uploadLexLogo,
  getAllLexLogo,
} from "../Controllers/ImageControllers.js";

const LogoRouter = express.Router();

LogoRouter.post("/uploadLexLogo", uploadLexLogo);
LogoRouter.get("/getAllLexLogo", getAllLexLogo);

export default LogoRouter;
