const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Usuarios');
const config = require('../utils/config');

// Registrar un nuevo usuario
exports.register = (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).send('Nombre, email y contraseña son requeridos');
    }

    const newUser = { nombre, email, password };
    User.createUser(newUser, (err, user) => {
        if (err) {
            return res.status(500).send('Error al registrar el usuario');
        }
        res.send(user);
    });
};

// Login de usuario
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email y contraseña son requeridos');
    }

    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).send('Error al obtener el usuario');
        }
        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error al comparar contraseñas');
            }
            if (!isMatch) {
                return res.status(400).send('Contraseña incorrecta');
            }

            const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
            res.send({ token });
        });
    });
};