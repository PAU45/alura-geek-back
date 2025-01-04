const express = require('express');
const router = express.Router();
const productController = require('../controllers/TiendaController'); // Asegúrate de que la ruta de importación sea correcta

// Rutas para productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;