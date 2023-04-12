const Cart = require('../models/cart.model');

exports.addItemToCart = async (req, res) =>{
    try {
        const { userId, productModel, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if(!cart){
            cart = await Cart.create({ user: userId });
        }

        cart.items.push({
            product: productId,
            productModel: productModel,
            quantity: quantity,
        });

        await cart.save();

        res.status(200).json({ message: 'item added to cart' });
    } catch(error) {
        res.status(500).json({ message: 'failed to add item to cart', error });
    }
}

exports.getItemsInCart = async (req, res) => {
    try{
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: userId });

        if(!cart){
            return res.status(404).json({ message: 'error' })
        }

        await cart.populateProducts();

        res.status(200).json(cart);
    }   catch(error){
        res.status(500).json({ message: 'failed to add item in cart', error });
    }
}

exports.getCartById = async (req, res) => {
    try{
        const { id } = req.params;
        const cart = await Cart.findById(id);

        if(!cart){
            return res.status(404).json({ message: 'cart not found' })
        }

        await cart.populateProducts();

        res.status(200).json(cart);
    }  catch(error){
        res.status(500).json({ message: 'failed to get cart' });
    }
}

exports.updateItemInCart = async (req, res) => {
    try{
        const { userId, itemId, newQuantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if(!cart){
            return res.status(404).json({ message: "error add to cart" })
        }

        const item = cart.items.id(itemId);

        if(!item) {
            return res.status(404).json({ message: 'item not found' });
        }

        item.quantity = newQuantity;
        await cart.save();

        res.status(200).json({ message: 'item update', cart });
    } catch(error) {
        res.status(500).json({ message: 'failed to update cart', error })
    }
}

exports.removeItemFromCart = async (req, res) => {
    try{
        const { userId, itemId } = req.body;

        const cart = await Cart.findOne({ user: userId});

        if(!cart){
            return res.status(404).json({ message: 'remove item from cart error' });
        }

        cart.items.id(itemId).remove();
        await cart.save();

        res.status(200).json({ message: 'item removed', cart });
    } catch(error) {
        res.status(500).json({ message: 'failed to remove item from cart', error });
    }
}