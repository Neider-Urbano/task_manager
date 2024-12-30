# Task Manager

## Descripción

Task Manager es una aplicación de gestión de tareas que permite a los usuarios crear, leer, actualizar y eliminar tareas. Los usuarios también pueden marcar las tareas como completadas o pendientes, todo a través de una interfaz intuitiva y moderna.

## Enlace a la aplicación desplegada

Puedes acceder a la aplicación desplegada en Render en el siguiente enlace:

[**Enlace a la aplicación desplegada**](https://taskmanager-production-a0d6.up.railway.app/)

## Tecnologías usadas

- **Backend:**
  - Node.js (v18)
  - Express.js
  - TypeScript
  - MongoDB
  - Mongoose (ODM para MongoDB)
  - JWT (para autenticación)
  - Express-validator (para validación de datos)
  - Swagger (para documentación de la API)
  - Jest (para pruebas)
  - Render

## Pasos para instalar y ejecutar el proyecto localmente

### 1. Clonar el repositorio

Primero, clona el repositorio del proyecto:

```bash
git clone https://github.com/Neider-Urbano/task_manager.git
cd task_manager
```

### 2. Instalar las dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

```bash
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=tu_secreto_jwt
PORT=3000
```

- MONGODB_URI: La URI de conexión a tu base de datos MongoDB. Si estás utilizando MongoDB localmente, puedes dejarla como mongodb://localhost:27017/task-manager.
- JWT_SECRET: Una clave secreta que se usará para firmar los tokens JWT.
- PORT: El puerto en el que se ejecutará el servidor. Por defecto es 3000.

### 4. Ejecutar el proyecto

Para levantar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor en http://localhost:3000.

### 5. Comandos para ejecutar pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm run test
```

Esto ejecutará Jest y mostrará los resultados de las pruebas en la terminal.

## Documentación de los endpoints

Una vez levantes el servidor del proyecto puedes acceder a la documentación de los endpoints usando la siguiente url:

```bash
http://localhost:3000/api-docs
```

## Detalles de configuración

- Base de datos: MongoDB debe estar corriendo localmente o puedes usar un servicio de MongoDB en la nube como MongoDB Atlas.
- Autenticación: El proyecto utiliza JWT para proteger las rutas del backend. Asegúrate de configurar correctamente la variable JWT_SECRET en el archivo .env.
