const express = require('express');
const router = express.Router();
const productController = require('../controllers/TiendaController');
const authenticateToken = require('../middlewares/auth');

// Rutas específicas primero
router.get('/best', productController.getBestDiscountedProducts);
router.get('/top', productController.getTopProducts);

// Rutas generales después
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;