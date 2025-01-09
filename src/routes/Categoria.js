const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');

// Rutas para categorías
router.post('/', categoriaController.createCategory);
router.get('/', categoriaController.getAllCategories);
router.get('/:id', categoriaController.getCategoryById);
router.put('/:id', categoriaController.updateCategory);
router.delete('/:id', categoriaController.deleteCategory);

module.exports = router;