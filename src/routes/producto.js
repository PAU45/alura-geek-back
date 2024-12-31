const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/TiendaController');

// Rutas para productos
router.get('/', tiendaController.getAllProducts);
router.get('/:id', tiendaController.getProductById);
router.post('/', tiendaController.createProduct); // Asegúrate de que esta ruta esté definida

// Rutas para pedidos
router.post('/orders', tiendaController.createOrder);

// Rutas para clientes
router.post('/customers', tiendaController.createCustomer);

module.exports = router;