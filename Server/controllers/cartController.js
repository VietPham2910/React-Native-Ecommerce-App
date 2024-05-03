const Product = require("../models/Product")
const Cart = require("../models/Cart");
module.exports = {
  addCart: async (req, res) => {
    // const userId = req.user.id;
    const { userId, cartItem, quantity } = req.body;

    try {
      // Check if the cart already exists for the user
      const cart = await Cart.findOne({ userId });
      console.log(cart)

      if (cart) {
        // Check if the cartItem already exists in the cart
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          // Increment the quantity if the cartItem exists
          existingProduct.quantity += quantity;
        } else {
          // Add the new product to the cart
          cart.products.push({ cartItem, quantity: quantity });
        }

        // Save the updated cart
        await cart.save();
        res.status(200).json("Product added to cart");
      } else {
        // Create a new cart and add the product
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity: quantity }],
        });
  
        const savedCart = await newCart.save();
        res.status(200).json("Product added to cart");
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },


  getCart: async (req, res) => {
    try {
      const cart = await Cart.find({ userId: req.params.id })
        .populate('products.cartItem', "_id title imageUrl price supplier");
      
      console.log(cart)

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

   deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItem;
    console.log(cartItemId)
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { 'products._id': cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete cart item' });
    }
  },
  

  //DELETE
  resetCart: async (req, res) => {
    try {
      console.log("reset cart triggered")
      await Cart.findOneAndDelete({ userId: req.params.id });
      res.status(200).json("Cart has been reset");
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
};