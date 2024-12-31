const products = require('../models/Producto');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    res.send(products);
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send('El producto con el ID proporcionado no fue encontrado');
        return;
    }
    res.send(product);
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        res.status(400).send('Nombre, precio y descripción son requeridos');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description
    };

    products.push(newProduct);
    res.send(newProduct);
};

// Crear un nuevo pedido
exports.createOrder = (req, res) => {
    const { customerId, productId, quantity } = req.body;
    if (!customerId || !productId || !quantity) {
        res.status(400).send('Customer ID, Product ID y Quantity son requeridos');
        return;
    }

    const newOrder = {
        id: orders.length + 1,
        customerId,
        productId,
        quantity,
        date: new Date().toISOString().split('T')[0]
    };

    orders.push(newOrder);
    res.send(newOrder);
};

// Crear un nuevo cliente
exports.createCustomer = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).send('Nombre y email son requeridos');
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name,
        email
    };

    customers.push(newCustomer);
    res.send(newCustomer);
};