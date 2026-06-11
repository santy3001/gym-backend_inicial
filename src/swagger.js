const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🏋️ Gym Backend API',
      version: '1.0.0',
      description: 'API RESTful para gestión de gimnasio — usuarios, membresías, rutinas y clases.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://gym-backend-latest.onrender.com', description: 'Producción (Render)' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtenido en /api/auth/login o /api/auth/register',
        },
      },
      schemas: {
        // ─── AUTH ────────────────────────────────────────────
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name:     { type: 'string',  example: 'Santiago Riaño' },
            email:    { type: 'string',  example: 'santiago@email.com' },
            password: { type: 'string',  example: 'Admin123!' },
            role:     { type: 'string',  enum: ['admin','trainer','member'], example: 'member' },
            phone:    { type: 'string',  example: '3001234567' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', example: 'santiago@email.com' },
            password: { type: 'string', example: 'Admin123!' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
            user: {
              type: 'object',
              properties: {
                id:    { type: 'string' },
                name:  { type: 'string' },
                email: { type: 'string' },
                role:  { type: 'string' },
              },
            },
          },
        },
        // ─── USER ────────────────────────────────────────────
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name:     { type: 'string',  example: 'Juan Pérez' },
            email:    { type: 'string',  example: 'juan@email.com' },
            password: { type: 'string',  example: 'Pass123!' },
            role:     { type: 'string',  enum: ['admin','trainer','member'], example: 'member' },
            phone:    { type: 'string',  example: '3109876543' },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            name:      { type: 'string' },
            email:     { type: 'string' },
            role:      { type: 'string' },
            phone:     { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // ─── MEMBERSHIP ──────────────────────────────────────
        MembershipInput: {
          type: 'object',
          required: ['user', 'type', 'endDate', 'price'],
          properties: {
            user:      { type: 'string', example: '664abc123...' },
            type:      { type: 'string', enum: ['mensual','trimestral','anual'], example: 'mensual' },
            startDate: { type: 'string', format: 'date', example: '2026-06-10' },
            endDate:   { type: 'string', format: 'date', example: '2026-07-10' },
            status:    { type: 'string', enum: ['activa','vencida','cancelada'], example: 'activa' },
            price:     { type: 'number', example: 80000 },
          },
        },
        Membership: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            user:      { $ref: '#/components/schemas/User' },
            type:      { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            endDate:   { type: 'string', format: 'date-time' },
            status:    { type: 'string' },
            price:     { type: 'number' },
          },
        },
        // ─── ROUTINE ─────────────────────────────────────────
        Exercise: {
          type: 'object',
          properties: {
            name:        { type: 'string',  example: 'Sentadilla' },
            sets:        { type: 'integer', example: 4 },
            reps:        { type: 'integer', example: 12 },
            restSeconds: { type: 'integer', example: 60 },
          },
        },
        RoutineInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name:        { type: 'string', example: 'Rutina de fuerza' },
            description: { type: 'string', example: 'Enfocada en tren inferior' },
            trainer:     { type: 'string', example: '664abc123...' },
            difficulty:  { type: 'string', enum: ['principiante','intermedio','avanzado'], example: 'intermedio' },
            exercises:   { type: 'array', items: { $ref: '#/components/schemas/Exercise' } },
          },
        },
        Routine: {
          type: 'object',
          properties: {
            _id:         { type: 'string' },
            name:        { type: 'string' },
            description: { type: 'string' },
            trainer:     { $ref: '#/components/schemas/User' },
            difficulty:  { type: 'string' },
            exercises:   { type: 'array', items: { $ref: '#/components/schemas/Exercise' } },
            createdAt:   { type: 'string', format: 'date-time' },
          },
        },
        // ─── CLASS ───────────────────────────────────────────
        ClassInput: {
          type: 'object',
          required: ['name', 'trainer', 'schedule', 'capacity'],
          properties: {
            name:     { type: 'string',  example: 'Spinning mañana' },
            trainer:  { type: 'string',  example: '664abc123...' },
            schedule: { type: 'string',  format: 'date-time', example: '2026-06-15T08:00:00Z' },
            capacity: { type: 'integer', example: 20 },
            location: { type: 'string',  example: 'Sala principal' },
          },
        },
        Class: {
          type: 'object',
          properties: {
            _id:      { type: 'string' },
            name:     { type: 'string' },
            trainer:  { $ref: '#/components/schemas/User' },
            schedule: { type: 'string', format: 'date-time' },
            capacity: { type: 'integer' },
            location: { type: 'string' },
            enrolled: { type: 'array', items: { $ref: '#/components/schemas/User' } },
          },
        },
        // ─── GENERICS ────────────────────────────────────────
        Error: {
          type: 'object',
          properties: { error: { type: 'string', example: 'Mensaje de error' } },
        },
        Message: {
          type: 'object',
          properties: { message: { type: 'string', example: 'Operación exitosa' } },
        },
      },
    },
    // seguridad global por defecto para todos los endpoints protegidos
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
