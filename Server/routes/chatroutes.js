import express from "express";
import { createchat, getchats, deletechat } from "../controllers/chatcontroller.js";
import { protect } from "../middleware/auth.js";

const chatRouter = express.Router();

chatRouter.post('/create', protect, createchat);
chatRouter.get('/getchats', protect, getchats);
chatRouter.post('/deletechat/:chatId', protect, deletechat);

export default chatRouter;