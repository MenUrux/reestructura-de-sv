import MessageModel from '../models/message.model.js';

const messageDao = {
    getAllMessages: async () => {
        return await MessageModel.find();
    },

    getMessageById: async (id) => {
        return await MessageModel.findById(id);
    },

    createMessage: async (messageData) => {
        const newMessage = new MessageModel(messageData);
        return await newMessage.save();
    },

    updateMessage: async (id, messageData) => {
        return await MessageModel.findByIdAndUpdate(id, messageData, { new: true });
    },

    deleteMessage: async (id) => {
        return await MessageModel.findByIdAndDelete(id);
    }
};

export default messageDao;
