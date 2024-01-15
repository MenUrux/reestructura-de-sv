import cartDao from '../dao/cart.dao.js';

const cartController = {
    getAllCarts: async (req, res) => {
        try {
            const carts = await cartDao.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).send('Error al obtener carritos');
        }
    },

    getCartById: async (req, res) => {
        try {
            const cart = await cartDao.getCartById(req.params.id);
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
            res.json(cart);
        } catch (error) {
            res.status(500).send('Error al obtener carrito');
        }
    },

    createCart: async (req, res) => {
        try {
            const newCart = await cartDao.createCart(req.body);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).send('Error al crear carrito');
        }
    },

    updateCart: async (req, res) => {
        try {
            const updatedCart = await cartDao.updateCart(req.params.id, req.body);
            if (!updatedCart) {
                return res.status(404).send('Carrito no encontrado');
            }
            res.json(updatedCart);
        } catch (error) {
            res.status(500).send('Error al actualizar carrito');
        }
    },

    deleteCart: async (req, res) => {
        try {
            await cartDao.deleteCart(req.params.id);
            res.status(200).send('Carrito eliminado');
        } catch (error) {
            res.status(500).send('Error al eliminar carrito');
        }
    },

    addProductToCart: async (req, res) => {
        try {
            const userId = req.user._id; // Asume que el usuario está autenticado y su ID está disponible
            const { productId } = req.body;

            let cart = await CartModel.findOne({ user: userId });

            if (!cart) {
                // Si no hay carrito, crea uno nuevo
                cart = new CartModel({
                    user: userId,
                    products: [{ product: productId, quantity: 1 }]
                });
            } else {
                // Si ya existe, agrega el producto
                const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

                if (productIndex > -1) {
                    // Incrementa la cantidad si el producto ya está en el carrito
                    cart.products[productIndex].quantity += 1;
                } else {
                    // Agrega el nuevo producto al carrito
                    cart.products.push({ product: productId, quantity: 1 });
                }
            }

            await cart.save();
            res.status(200).json({ message: 'Producto agregado al carrito' });
        } catch (error) {
            res.status(500).send('Error al agregar producto al carrito: ' + error.message);
        }
    }

}

export default cartController;
