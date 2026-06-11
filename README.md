# 🏋️ Gym Backend API

Backend RESTful para gestión de gimnasio desarrollado con **Node.js**, **Express** y **MongoDB (Mongoose)**.

## 📁 Estructura del proyecto

```
gym-backend/
├── index.js                   # Punto de entrada
├── .env.example               # Variables de entorno de ejemplo
├── src/
│   ├── controllers/           # Manejo de request/response
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── membership.controller.js
│   │   ├── routine.controller.js
│   │   └── class.controller.js
│   ├── services/              # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── membership.service.js
│   │   ├── routine.service.js
│   │   └── class.service.js
│   ├── repositories/          # Acceso a base de datos
│   │   ├── user.repository.js
│   │   ├── membership.repository.js
│   │   ├── routine.repository.js
│   │   └── class.repository.js
│   ├── schemas/               # Modelos Mongoose
│   │   ├── user.schema.js
│   │   ├── membership.schema.js
│   │   ├── routine.schema.js
│   │   └── class.schema.js
│   ├── routes/                # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── membership.routes.js
│   │   ├── routine.routes.js
│   │   └── class.routes.js
│   └── middlewares/
│       └── auth.middleware.js # Verificación JWT
```

## 🚀 Instalación local

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd gym-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tu URI de MongoDB y tu JWT_SECRET

# 4. Ejecutar en desarrollo
npm run dev

# 5. Ejecutar en producción
npm start
```

## 🌐 Despliegue en Render

1. Crear un **Web Service** en [render.com](https://render.com) conectado al repositorio GitHub.
2. Configurar las variables de entorno en el panel de Render:
   - `MONGO_URI` → URI de MongoDB Atlas
   - `JWT_SECRET` → clave secreta para JWT
   - `PORT` → (Render lo asigna automáticamente)
3. Start command: `npm start`

**URL pública:** `https://<nombre-del-servicio>.onrender.com`

## 📌 Endpoints

### Auth
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| POST | `/api/auth/login` | Iniciar sesión | ❌ |

### Usuarios
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/users` | Obtener todos | ✅ |
| GET | `/api/users/:id` | Obtener por ID | ✅ |
| POST | `/api/users` | Crear usuario | ❌ |
| PUT | `/api/users/:id` | Actualizar | ✅ |
| DELETE | `/api/users/:id` | Eliminar | ✅ |

### Membresías
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/memberships` | Obtener todas | ✅ |
| GET | `/api/memberships/:id` | Obtener por ID | ✅ |
| GET | `/api/memberships/user/:userId` | Por usuario | ✅ |
| POST | `/api/memberships` | Crear | ✅ |
| PUT | `/api/memberships/:id` | Actualizar | ✅ |
| DELETE | `/api/memberships/:id` | Eliminar | ✅ |

### Rutinas
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/routines` | Obtener todas | ✅ |
| GET | `/api/routines/:id` | Obtener por ID | ✅ |
| POST | `/api/routines` | Crear | ✅ |
| PUT | `/api/routines/:id` | Actualizar | ✅ |
| DELETE | `/api/routines/:id` | Eliminar | ✅ |

### Clases
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/classes` | Obtener todas | ✅ |
| GET | `/api/classes/:id` | Obtener por ID | ✅ |
| POST | `/api/classes` | Crear clase | ✅ |
| PUT | `/api/classes/:id` | Actualizar | ✅ |
| POST | `/api/classes/:id/enroll` | Inscribir usuario | ✅ |
| DELETE | `/api/classes/:id` | Eliminar | ✅ |

## 🔐 Autenticación

Los endpoints marcados con ✅ requieren el header:
```
Authorization: Bearer <token>
```
El token se obtiene al hacer login o registro.

## 📦 Dependencias principales

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| mongoose | ODM para MongoDB |
| bcryptjs | Hash de contraseñas |
| jsonwebtoken | Autenticación JWT |
| dotenv | Variables de entorno |
| cors | Habilitar CORS |
