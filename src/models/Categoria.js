const db = require('../db');

// Crear una nueva categoría
exports.createCategory = (category, callback) => {
    db.query('INSERT INTO categories SET ?', category, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: results.insertId, ...category });
    });
};

// Obtener todas las categorías
exports.getAllCategories = (callback) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Obtener una categoría por ID
exports.getCategoryById = (id, callback) => {
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('La categoría con el ID proporcionado no fue encontrada'), null);
        }
        callback(null, results[0]);
    });
};

// Actualizar una categoría existente
exports.updateCategory = (id, category, callback) => {
    db.query('UPDATE categories SET ? WHERE id = ?', [category, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id, ...category });
    });
};

// Eliminar una categoría
exports.deleteCategory = (id, callback) => {
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id });
    });
};