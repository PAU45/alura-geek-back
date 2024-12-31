const products = require('../models/Producto');
const orders = require('../models/orden');
const customers = require('../models/usuarios');

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

// Agregar un nuevo producto
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

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send('El producto con el ID proporcionado no fue encontrado');
        return;
    }

    const { name, price, description } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    res.send(product);
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        res.status(404).send('El producto con el ID proporcionado no fue encontrado');
        return;
    }

    const deletedProduct = products.splice(productIndex, 1);
    res.send(deletedProduct);
};

// Obtener todos los pedidos
exports.getAllOrders = (req, res) => {
    res.send(orders);
};

// Obtener un pedido por ID
exports.getOrderById = (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        res.status(404).send('El pedido con el ID proporcionado no fue encontrado');
        return;
    }
    res.send(order);
};

// Obtener todos los clientes
exports.getAllCustomers = (req, res) => {
    res.send(customers);
};

// Obtener un cliente por ID
exports.getCustomerById = (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).send('El cliente con el ID proporcionado no fue encontrado');
        return;
    }
    res.send(customer);
};