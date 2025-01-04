const Product = require('../models/Producto');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) {
            res.status(500).send('Error retrieving products');
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
            res.status(500).send('Error retrieving product');
            return;
        }
        res.send(result);
    });
};

// Agregar un nuevo producto
exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        res.status(400).send('Nombre, precio y descripción son requeridos');
        return;
    }

    const newProduct = { name, price, description };
    Product.createProduct(newProduct, (err, result) => {
        if (err) {
            res.status(500).send('Error creating product');
            return;
        }
        res.send(result);
    });
};

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, description } = req.body;
    const updatedProduct = { name, price, description };

    Product.updateProduct(productId, updatedProduct, (err, result) => {
        if (err) {
            res.status(500).send('Error updating product');
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
            res.status(500).send('Error deleting product');
            return;
        }
        res.send(result);
    });
};