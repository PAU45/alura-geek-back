const Product = require('../models/Producto');

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
    const { nombre, precio, descripcion, categoria_id } = req.body;
    if (!nombre || !precio || !descripcion || !categoria_id) {
        res.status(400).send('Nombre, precio, descripción y categoría son requeridos');
        return;
    }

    const nuevoProducto = { nombre, precio, descripcion, categoria_id };
    Product.createProduct(nuevoProducto, (err, result) => {
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
    const { nombre, precio, descripcion, categoria_id } = req.body;
    const productoActualizado = { nombre, precio, descripcion, categoria_id };

    Product.updateProduct(productId, productoActualizado, (err, result) => {
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