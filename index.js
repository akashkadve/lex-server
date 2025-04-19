import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./Routes/Routes.js";
import addLegalAssociateRoute from "./Routes/LegalAssociate.Route.js";
import addInternshipsRoute from "./Routes/Internships.Route.js";
import routes from "./Routes/Area_Of_Practice.js";
import HomeRoute from "./Routes/HomeRoute.js";
import LogoRouter from "./Routes/ImageRoutes.js";

const app = express();
app.use(express.Router());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
app.use("/api", addLegalAssociateRoute);
app.use("/api", addInternshipsRoute);
app.use("/api", routes);
app.use("/api", HomeRoute);
app.use("/api", LogoRouter);

//cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
