const users = require('../models/Usuarios');

// Registrar un nuevo usuario
exports.registerUser = (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        res.status(400).send('Username, password, and email are required');
        return;
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };

    users.push(newUser);
    res.send(newUser);
};

// Iniciar sesión de un usuario
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(401).send('Invalid username or password');
        return;
    }

    res.send(user);
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.send(user);
};