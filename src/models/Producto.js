const db = require('/home/paulin/Documents/api/src/db.js');
// Obtener todos los productos
exports.getAllProducts = (callback) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Obtener un producto por ID
exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('El producto con el ID proporcionado no fue encontrado'), null);
        }
        callback(null, results[0]);
    });
};

// Agregar un nuevo producto
exports.createProduct = (product, callback) => {
    db.query('INSERT INTO products SET ?', product, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: results.insertId, ...product });
    });
};

// Actualizar un producto existente
exports.updateProduct = (id, product, callback) => {
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id, ...product });
    });
};

// Eliminar un producto
exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id });
    });
};

// Obtener los mejores productos
exports.getTopProducts = (limit, callback) => {
    db.query('SELECT * FROM products ORDER BY rating DESC LIMIT ?', [limit], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};



// ...existing code...



exports.getBestDiscountedProducts = (callback) => {
    const query = `
        SELECT *,
            price * (1 - discount/100) as final_price,
            price * (discount/100) as savings
        FROM products 
        WHERE discount > 0 
        ORDER BY discount DESC`;
        
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};