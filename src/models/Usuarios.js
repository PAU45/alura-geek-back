const db = require('../db');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
exports.createUser = (user, callback) => {
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err, null);
        }
        user.password = hashedPassword;
        db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, { id: results.insertId, ...user });
        });
    });
};

// Obtener un usuario por email
exports.getUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('Usuario no encontrado'), null);
        }
        callback(null, results[0]);
    });
};

// Obtener un usuario por ID
exports.findById = (id, callback) => {
    db.query('SELECT id, nombre, email FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

// Obtener un usuario por nombre de usuario
exports.findByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE nombre = ?', [username], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};