import express from "express";
import { getPlans, purchasePlan } from "../controllers/creditcontroller.js";
import { protect } from "../middleware/auth.js";

const creditrouter = express.Router()

creditrouter.get('/plan', getPlans)
creditrouter.post('/purchase', protect, purchasePlan)

export default creditrouter
