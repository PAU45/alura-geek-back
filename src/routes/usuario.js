const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsuarioController');
const authenticateToken = require('../middlewares/auth'); // Importar el middleware de autenticación

// Rutas para usuarios
router.get('/me', authenticateToken, userController.getAuthenticatedUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);

module.exports = router;