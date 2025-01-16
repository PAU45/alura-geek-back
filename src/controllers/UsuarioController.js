const User = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

exports.registerUser = async (req, res) => {
    const { nombre, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { nombre, password: hashedPassword, email };

        User.createUser(newUser, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.id });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.getUserByEmail(email, async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user.id }, config.jwtSecret,{ expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};

exports.getAuthenticatedUser = (req, res) => {
    const userId = req.user.userId; // Obtener el userId del token JWT

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la información del usuario' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ id: user.id, nombre: user.nombre, email: user.email });
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la información del usuario' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ id: user.id, nombre: user.nombre, email: user.email });
    });
};