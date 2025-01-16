const Order = require('../models/Orden');

exports.createOrder = (req, res) => {
    const { products, total, status = 'pending' } = req.body;
    const user_id = req.user.userId; // Obtener el user_id del token JWT

    if (!products || products.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron productos para la orden' });
    }

    // Validar que cada producto tenga un product_id y una cantidad
    for (const product of products) {
        if (!product.product_id || !product.quantity) {
            return res.status(400).json({ error: 'Cada producto debe tener un product_id y una cantidad' });
        }
    }

    const orderData = {
        user_id,
        total,
        status,
        created_at: new Date()
    };

    Order.createOrder(orderData, products, (err, result) => {
        if (err) {
            console.error('Error al crear la orden:', err);
            return res.status(500).json({
                error: 'Error al crear la orden'
            });
        }
        res.status(201).json({
            message: 'Orden creada exitosamente',
            orderId: result.insertId
        });
    });
};

exports.getAllOrders = (req, res) => {
    Order.getAllOrders((err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al obtener las órdenes'
            });
        }
        res.json(results);
    });
};

exports.getOrderById = (req, res) => {
    const orderId = req.params.id;
    Order.getOrderById(orderId, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al obtener la orden'
            });
        }
        if (!result) {
            return res.status(404).json({
                message: 'Orden no encontrada'
            });
        }
        res.json(result);
    });
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    Order.updateOrderStatus(id, status, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al actualizar el estado de la orden'
            });
        }
        res.json({
            message: 'Estado de orden actualizado',
            orderId: id,
            status: status
        });
    });
};

exports.getOrdersByUserId = (req, res) => {
    const userId = req.user.userId; // Obtener el userId del token JWT

    Order.getOrdersByUserId(userId, (err, orders) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al obtener las órdenes del usuario'
            });
        }
        res.json(orders);
    });
};