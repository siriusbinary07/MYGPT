import express from "express";
import {protect} from "../middleware/auth.js";
import { textmessagecontroller, imagemessagecontroller } from "../controllers/messagecontroller.js";


const messageRouter = express.Router();

messageRouter.post("/text",protect , textmessagecontroller);
messageRouter.post("/image",protect , imagemessagecontroller);

export default messageRouter;