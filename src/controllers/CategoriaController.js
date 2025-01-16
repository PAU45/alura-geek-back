const Category = require('../models/Categoria');

// Crear una nueva categoría
exports.createCategory = (req, res) => {
    const { nombre, imagen_url } = req.body;
    if (!nombre) {
        return res.status(400).send('El nombre de la categoría es requerido');
    }

    const newCategory = { nombre, imagen_url };
    Category.createCategory(newCategory, (err, category) => {
        if (err) {
            return res.status(500).send('Error al crear la categoría');
        }
        res.send(category);
    });
};

// Obtener todas las categorías
exports.getAllCategories = (req, res) => {
    Category.getAllCategories((err, categories) => {
        if (err) {
            return res.status(500).send('Error al obtener las categorías');
        }
        res.send(categories);
    });
};

// Obtener una categoría por ID
exports.getCategoryById = (req, res) => {
    const categoryId = parseInt(req.params.id);
    Category.getCategoryById(categoryId, (err, category) => {
        if (err) {
            return res.status(500).send('Error al obtener la categoría');
        }
        res.send(category);
    });
};

// Actualizar una categoría existente
exports.updateCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { nombre, imagen_url } = req.body;
    const updatedCategory = { nombre, imagen_url };

    Category.updateCategory(categoryId, updatedCategory, (err, category) => {
        if (err) {
            return res.status(500).send('Error al actualizar la categoría');
        }
        res.send(category);
    });
};

// Eliminar una categoría
exports.deleteCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    Category.deleteCategory(categoryId, (err, category) => {
        if (err) {
            return res.status(500).send('Error al eliminar la categoría');
        }
        res.send(category);
    });
};