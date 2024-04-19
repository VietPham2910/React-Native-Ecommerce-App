const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get("/find/:id", cartController.getCart);

router.post("/", cartController.addCart);

router.delete("/:cartItem", cartController.deleteCartItem);

router.delete("/:id", cartController.resetCart);

module.exports = router
