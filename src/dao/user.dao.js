import UserModel from '../models/user.model.js';

const userDao = {
    getAllUsers: async () => {
        return await UserModel.find();
    },

    getUserById: async (id) => {
        return await UserModel.findById(id);
    },

    createUser: async (userData) => {
        const newUser = new UserModel(userData);
        return await newUser.save();
    },

    updateUser: async (id, userData) => {
        return await UserModel.findByIdAndUpdate(id, userData, { new: true });
    },

    deleteUser: async (id) => {
        return await UserModel.findByIdAndDelete(id);
    }
};

export default userDao;
