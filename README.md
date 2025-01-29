# AutenticacionUsuarios

API Backend - Autenticación de Usuarios y Gestión de Productos
Este proyecto es una API backend que permite la autenticación de usuarios, así como la gestión de productos. La aplicación está diseñada para ser consumida por un cliente frontend y está basada en una API REST.

Características Principales
Tipos de Usuarios
La API gestiona tres tipos de usuarios con diferentes niveles de acceso y permisos:

Usuario Regular:
Registro e inicio de sesión.
Puede ver y agregar productos al carrito, pero no puede realizar modificaciones en los productos.
Administrador:
Tiene todos los privilegios de un usuario regular.
Puede agregar, editar y eliminar productos de la base de datos.
Super Administrador:
Tiene todos los privilegios de un administrador.
Acceso completo a la gestión de usuarios, productos y otros recursos críticos de la aplicación.
Métodos de la API
La API proporciona los siguientes endpoints:

Autenticación y Gestión de Usuarios
POST /api/auth/register: Registro de un nuevo usuario. (Requiere datos: correo, nombre, contraseña).
POST /api/auth/login: Inicio de sesión de un usuario. (Requiere datos: correo, contraseña).
GET /api/auth/logout: Cierre de sesión.
GET /api/users: Obtención de la lista de usuarios (solo para administradores y superadministradores).
GET /api/users/:id: Obtención de detalles de un usuario específico (solo para administradores y superadministradores).
PUT /api/users/:id: Actualización de la información de un usuario (solo para administradores y superadministradores).
Gestión de Productos
GET /api/products: Obtención de todos los productos disponibles.
GET /api/products/:id: Obtención de los detalles de un producto específico.
POST /api/products: Creación de un nuevo producto (solo para administradores y superadministradores).
PUT /api/products/:id: Actualización de un producto existente (solo para administradores y superadministradores).
DELETE /api/products/:id: Eliminación de un producto (solo para administradores y superadministradores).
Carrito de Compras
GET /api/cart: Obtención del carrito de un usuario autenticado.
POST /api/cart: Agregar un producto al carrito de un usuario autenticado.
PUT /api/cart/:id: Actualización de la cantidad de un producto en el carrito.
DELETE /api/cart/:id: Eliminar un producto del carrito.
POST /api/cart/checkout: Proceder al proceso de compra.
API RESTful
Esta API sigue los principios de REST (Representational State Transfer) y utiliza los métodos HTTP estándar:

GET: Para obtener datos (por ejemplo, listar productos o obtener detalles de un usuario).
POST: Para crear nuevos recursos (por ejemplo, registrar un nuevo usuario o agregar un producto).
PUT: Para actualizar recursos existentes (por ejemplo, actualizar detalles de un producto o modificar la cantidad de un artículo en el carrito).
DELETE: Para eliminar recursos (por ejemplo, eliminar un producto o quitar un artículo del carrito).
Gestión de Productos
Los productos son la parte fundamental de la API y pueden ser gestionados por los usuarios con permisos adecuados. Las acciones posibles con los productos son:

Visualización: Los usuarios pueden ver todos los productos disponibles o obtener detalles de un producto específico.
Creación: Los administradores y superadministradores pueden crear nuevos productos, añadiendo detalles como nombre, descripción, precio, y cantidad en stock.
Actualización: Los administradores pueden modificar productos existentes, actualizando su información (por ejemplo, precio o descripción).
Eliminación: Los administradores pueden eliminar productos que ya no estén disponibles o sean irrelevantes.
Tecnologías Utilizadas
Node.js: Entorno de ejecución para el servidor backend.
Express: Framework para crear las rutas y manejar las peticiones HTTP.
MongoDB: Base de datos NoSQL para almacenar usuarios y productos.
JWT (JSON Web Token): Para la autenticación y manejo de sesiones de los usuarios.
Bcrypt: Para encriptar las contraseñas de los usuarios de manera segura.
