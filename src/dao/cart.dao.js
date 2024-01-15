import CartModel from '../models/cart.model.js';

const cartDao = {
    getAllCarts: async () => {
        return await CartModel.find().populate('products.product');
    },

    getCartById: async (id) => {
        return await CartModel.findById(id).populate('products.product');
    },

    createCart: async (cartData) => {
        const newCart = new CartModel(cartData);
        return await newCart.save();
    },

    updateCart: async (id, cartData) => {
        return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
    },

    deleteCart: async (id) => {
        return await CartModel.findByIdAndDelete(id);
    }
};

export default cartDao;
