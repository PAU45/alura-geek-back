const express = require('express');
const app = express();
const config = require('./src/utils/config');
const adminRoutes = require('./src/routes/Admin');
const productRoutes = require('./src/routes/producto');
const userRoutes = require('./src/routes/usuario');
const logger = require('./src/middlewares/logger');

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Welcome to Alura Geek Store');
});

app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes); // Asegúrate de que esta línea esté presente
app.use('/api/users', userRoutes);

const port = config.server.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});