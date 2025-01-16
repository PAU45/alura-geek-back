const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middlewares/auth');

// Rutas de órdenes
router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getAllOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);
router.put('/:id/status', authenticateToken, orderController.updateOrderStatus);
router.get('/me', authenticateToken, orderController.getOrdersByUserId); // Nueva ruta para obtener las órdenes de un usuario

module.exports = router;