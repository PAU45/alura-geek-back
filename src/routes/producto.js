const express = require('express');
const router = express.Router();
const productController = require('../controllers/TiendaController');
const authenticateToken = require('../middlewares/auth'); // Importar el middleware de autenticación

// Rutas para productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authenticateToken, productController.createProduct); // Proteger la ruta
router.put('/:id', authenticateToken, productController.updateProduct); // Proteger la ruta
router.delete('/:id', authenticateToken, productController.deleteProduct); // Proteger la ruta

module.exports = router;