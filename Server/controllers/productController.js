const Product = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("product created");
    } catch (error) {
      res.status(500).json("failed to create product");
    }
  },

  getAllProducts: async (req, res) => {
    try {
      //Expect query param like this: ?Category=Desk or ?sortBy=createdAt&order=1
      const queryObj = {};
      const sortObj = {};
      for (key in req.query) {
        if (key === "category") {
          queryObj[key] = req.query[key];
        } else if (key === "sortBy") {
          sortObj[req.query[key]] = req.query.order;
        }
      }
      console.log(req.query);
      console.log(queryObj);
      console.log(sortObj);
      const products = await Product.find(queryObj).sort(sortObj);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const { __v, createdAt, ...productData } = product._doc;
      res.status(200).json(productData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchProducts: async (req, res) => {
    console.log(req.params.key);
    const searchPattern = req.params.key;
    try {
      results = await Product.aggregate([
        {
          $match: {
            title: { $regex: searchPattern, $options: "i" }, // Using regex for case-insensitive search
          },
        },
        {
          $sort: { createdAt: 1 }, // Optional: sorting the results newest to oldest
        },
      ]);
      console.log(results);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
