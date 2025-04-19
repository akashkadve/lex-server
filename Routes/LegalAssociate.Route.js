import express from "express";
import { addLegalAssociate } from "../Controllers/LegalAssociate.controller.js";

const addLegalAssociateRoute = express.Router();
addLegalAssociateRoute.post("/create_LegalAssociate", addLegalAssociate);

export default addLegalAssociateRoute;
