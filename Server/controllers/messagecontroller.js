import chat from "../models/chat.js";
import user from "../models/user.js";
import axios from "axios";
import imagekit from "../configs/imagekit.js";
import openai from "../configs/openai.js";

// text based AI CHAT MESSAGE CONTROLLER
export const textmessagecontroller = async (req, res) => {
    try {
        const userId = req.user._id;
       // check credits 
       if (req.user.credits < 1) {
            return res.json({ success: false, message: "Insufficient credits to send a message" });
       }

        const { chatId, prompt } = req.body;

        const chatRecord = await chat.findOne({ userId, _id: chatId });
        if (!chatRecord) {
            return res.json({ success: false, message: "Chat not found" });
        }

        chatRecord.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        const { choices } = await openai.chat.completions.create({
            model: "gemini-3.8-flash",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {
            ...choices[0].message,
            timestamp: Date.now(),
            isImage: false,
        };

        chatRecord.messages.push(reply);
        await chatRecord.save();
        await user.updateOne({ _id: userId }, { $inc: { credits: -1 } });

        return res.json({ success: true, message: "Message sent successfully", data: reply });
    } catch (error) {
        return res.json({ success: false, message: "Failed to send message", error: error.message });
    }
};

// Image generation AI CHAT MESSAGE CONTROLLER
export const imagemessagecontroller = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 2) {
            return res.json({ success: false, message: "Insufficient credits to generate an image" });
        }

        const { chatId, prompt, isPublished } = req.body;
        const chatRecord = await chat.findOne({ userId, _id: chatId });

        if (!chatRecord) {
            return res.json({ success: false, message: "Chat not found" });
        }

        chatRecord.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        const encodedPrompt = encodeURIComponent(prompt);
        const freeImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true`;

        const response = await axios.get(freeImageUrl, { responseType: "arraybuffer" });
        const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `MYGPT_${Date.now()}.png`,
            folder: "MYGPT",
        });
        

        const reply = {
            role: "assistant",
            content: uploadResponse.url.trim(),
            timestamp: Date.now(),
            isImage: true,
            isPublished,
        };

        chatRecord.messages.push(reply);
        await chatRecord.save();
        await user.updateOne({ _id: userId }, { $inc: { credits: -2 } });

        return res.json({ success: true, message: "Image generated successfully", data: reply });
    } catch (error) {
        return res.json({ success: false, message: "Failed to generate image", error: error.message });
    }
};
