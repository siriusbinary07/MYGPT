import chat from "../models/chat.js";

//API controller for creating a new chat
export const createchat = async (req, res) => {
    try{
        const userId = req.user._id
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            username: req.user.name
        }

        const newChat = await chat.create(chatData)
        res.json({ success: true, message: "Chat created successfully", chat: newChat });
    } catch (error) {
        return res.status(500).json({ message: "Error creating chat", error });
    }
}
//API controller for fetching all chats of a user
export const getchats = async (req, res) => {
    try{
        const userId = req.user._id

        const chats = await chat.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, chats });
    } catch (error) {
        return res.json({ message: "Error fetching chats", error });
    }
}

           //API controller for deleting a chat
           export const deletechat = async (req, res) => {
    try{
        const userId = req.user._id
        const { chatId } = req.body

        const deletedChat = await chat.findOneAndDelete({ _id: chatId, userId });
        if (!deletedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting chat", error });
    }
}
