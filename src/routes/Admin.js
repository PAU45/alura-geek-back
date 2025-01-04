const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdmindController'); // Asegúrate de que la ruta de importación sea correcta

// Rutas para productos
router.get('/products', adminController.getAllProducts);
router.get('/products/:id', adminController.getProductById);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Rutas para pedidos
router.get('/orders', adminController.getAllOrders);
router.get('/orders/:id', adminController.getOrderById);

// Rutas para clientes
router.get('/customers', adminController.getAllCustomers);
router.get('/customers/:id', adminController.getCustomerById);

module.exports = router;