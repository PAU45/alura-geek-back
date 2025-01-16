const db = require('../db');

const Order = {
    createOrder: (orderData, products, callback) => {
        db.query('INSERT INTO orders SET ?', orderData, (err, result) => {
            if (err) return callback(err);

            const orderId = result.insertId;
            const orderProducts = products.map(product => [orderId, product.product_id, product.quantity]);

            db.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES ?', [orderProducts], (err) => {
                if (err) return callback(err);
                callback(null, result);
            });
        });
    },

    getAllOrders: (callback) => {
        db.query('SELECT * FROM orders', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getOrderById: (id, callback) => {
        db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(new Error('Order not found'));

            const order = results[0];
            db.query('SELECT * FROM order_products WHERE order_id = ?', [id], (err, products) => {
                if (err) return callback(err);
                order.products = products;
                callback(null, order);
            });
        });
    },

    updateOrderStatus: (id, status, callback) => {
        db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    getOrdersByUserId: (userId, callback) => {
        db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Order;