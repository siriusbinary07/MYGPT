import 'dotenv/config.js'
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatroutes.js";
import messageRouter from "./routes/messageroutes.js";
import creditrouter from './routes/creditroutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';


const app = express();
await connectDB();
//stripe webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}),
stripeWebhooks)

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.use('/api/credit', creditrouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});