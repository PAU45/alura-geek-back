# Alura Geek Store API

Esta es la API para la tienda virtual Alura Geek Store. La API permite gestionar productos, pedidos y clientes, así como manejar la autenticación de usuarios.

## Endpoints

### Productos

#### Obtener todos los productos

- **URL**: `/api/products`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de todos los productos.
- **Respuesta**:
    ```json
    [
        { "id": 1, "name": "Product 1", "price": 100, "description": "Description of Product 1" },
        { "id": 2, "name": "Product 2", "price": 200, "description": "Description of Product 2" },
        { "id": 3, "name": "Product 3", "price": 300, "description": "Description of Product 3" }
    ]
    ```

#### Crear un nuevo producto

- **URL**: `/api/products`
- **Método**: `POST`
- **Descripción**: Crea un nuevo producto.
- **Cuerpo de la solicitud**:
    ```json
    {
        "name": "Nuevo Producto",
        "price": 150,
        "description": "Descripción del nuevo producto"
    }
    ```
- **Respuesta**:
    ```json
    {
        "id": 4,
        "name": "Nuevo Producto",
        "price": 150,
        "description": "Descripción del nuevo producto"
    }
    ```

### Pedidos

#### Obtener todos los pedidos

- **URL**: `/api/orders`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de todos los pedidos.
- **Respuesta**:
    ```json
    [
        { "id": 1, "product_id": 1, "quantity": 2, "total_price": 200 },
        { "id": 2, "product_id": 2, "quantity": 1, "total_price": 200 }
    ]
    ```

### Clientes

#### Obtener todos los clientes

- **URL**: `/api/customers`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de todos los clientes.
- **Respuesta**:
    ```json
    [
        { "id": 1, "name": "Cliente 1", "email": "cliente1@example.com" },
        { "id": 2, "name": "Cliente 2", "email": "cliente2@example.com" }
    ]
    ```

### Autenticación

#### Iniciar sesión

- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Descripción**: Autentica a un usuario y devuelve un token.
- **Cuerpo de la solicitud**:
    ```json
    {
        "username": "usuario",
        "password": "contraseña"
    }
    ```
- **Respuesta**:
    ```json
    {
        "token": "jwt-token"
    }
    ```