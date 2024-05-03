const router = require('express').Router();
const orderController = require('../controllers/ordersController');


router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.get("/:id", orderController.getUserOrders);

module.exports = router
