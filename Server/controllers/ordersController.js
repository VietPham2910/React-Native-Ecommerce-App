const Order = require("../models/Orders");

module.exports = {
    getOrders: async (req, res) => {
        const userId =  req.params.id;
        
        const allOrder = await Order.find()

        res.status(200).json(allOrder)

    
    },

     getUserOrders: async (req, res) => {
      console.log("Getting user orders...")
        const userId = req.params.id;
        try {
          const userOrders = await Order.find({ userId })
            .populate('productId') // Populate the 'productId' field
            .exec();
          console.log("User oders: ", userOrders)
          res.status(200).json(userOrders);
        } catch (error) {
          res.status(500).json({ message: "Failed to get user orders" });
        }
      },

    createOrder: async (req, res) => {
      console.log(req.body.cartItems)
      const items = JSON.parse(req.body.cartItems);

      for (const item of items){
        const newOrder = new Order({
          userId: JSON.parse(req.body.userId),
          customerId: JSON.parse(req.body.userId),
          productId: item.cartItem._id,
          quantity: item.quantity,
          subtotal: item.quantity * parseFloat(item.cartItem.price.replace("$", "")),
          total: item.quantity * parseFloat(item.cartItem.price.replace("$", "")),
          delivery_status: req.body.delivery_status,
          payment_status: req.body.payment_status,
        });
        try {
          const savedOrder = await newOrder.save();
          console.log("Processed Order:", savedOrder);
        } catch (err) {
          console.log(err);
        }

      }   
      res.status(200).json("Orders placed");
    }
}