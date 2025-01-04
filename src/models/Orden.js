const db = require('../db');

// Obtener todos los pedidos
exports.getAllOrders = (callback) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Obtener un pedido por ID
exports.getOrderById = (id, callback) => {
    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('El pedido con el ID proporcionado no fue encontrado'), null);
        }
        callback(null, results[0]);
    });
};