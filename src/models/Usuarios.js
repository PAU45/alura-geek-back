const db = require('../db');

// Obtener todos los clientes
exports.getAllCustomers = (callback) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Obtener un cliente por ID
exports.getCustomerById = (id, callback) => {
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('El cliente con el ID proporcionado no fue encontrado'), null);
        }
        callback(null, results[0]);
    });
};