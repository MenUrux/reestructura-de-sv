import ProductModel from '../models/product.model.js';

const productDao = {
    getAllProducts: async () => {
        return await ProductModel.find();
    },

    getProductById: async (id) => {
        return await ProductModel.findById(id);
    },

    createProduct: async (productData) => {
        const newProduct = new ProductModel(productData);
        return await newProduct.save();
    },

    updateProduct: async (id, productData) => {
        return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    },

    deleteProduct: async (id) => {
        return await ProductModel.findByIdAndDelete(id);
    },

    getPaginatedProducts: async (criteria, options) => {
        return await ProductModel.paginate(criteria, options);
    }


};

export default productDao;
