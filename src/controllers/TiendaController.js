const Product = require('../models/Producto');
const db = require('/home/paulin/Documents/api/src/db.js');
// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) {
            res.status(500).send('Error al recuperar los productos');
            return;
        }
        res.send(results);
    });
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    Product.getProductById(productId, (err, result) => {
        if (err) {
            res.status(500).send('Error al recuperar el producto');
            return;
        }
        res.send(result);
    });
};

// Agregar un nuevo producto
exports.createProduct = (req, res) => {
    const { name, price, description, categoria_id, imagen_url, rating } = req.body;
    if (!name || !price || !description || !categoria_id || !imagen_url) {
        res.status(400).send('Name, price, description, categoria_id e imagen_url son requeridos');
        return;
    }

    const newProduct = { name, price, description, categoria_id, imagen_url, rating };
    Product.createProduct(newProduct, (err, result) => {
        if (err) {
            res.status(500).send('Error al crear el producto');
            return;
        }
        res.send(result);
    });
};

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, description, categoria_id, imagen_url, rating } = req.body;
    const updatedProduct = { name, price, description, categoria_id, imagen_url, rating };

    Product.updateProduct(productId, updatedProduct, (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar el producto');
            return;
        }
        res.send(result);
    });
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    Product.deleteProduct(productId, (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el producto');
            return;
        }
        res.send(result);
    });
};

// Asegúrate de que la ruta sea la correcta

exports.getTopProducts = (req, res) => {
    console.log('Consultando productos con rating entre 3 y 5');

    // Consulta SQL para obtener productos con rating entre 3 y 5
    const query = 'SELECT * FROM products WHERE rating BETWEEN 3.00 AND 5.00 ORDER BY rating DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error al recuperar los mejores productos', details: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos con el rating especificado' });
        }

        console.log('Productos recuperados:', results);
        res.status(200).json(results);
    });
};



exports.getBestDiscountedProducts = (req, res) => {
    const query = `
        SELECT *,
            price * (1 - discount/100) as final_price,
            price * (discount/100) as savings
        FROM products 
        WHERE discount > 0 
        ORDER BY discount DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en consulta:', err);
            return res.status(500).json({
                error: 'Error al obtener productos con descuento'
            });
        }
        
        if (!results.length) {
            return res.status(404).json({
                message: 'No hay productos con descuento'
            });
        }

        res.json(results);
    });
};