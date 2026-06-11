const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const swaggerUi     = require('swagger-ui-express');
const swaggerSpec   = require('./src/swagger');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Swagger UI ─────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: '🏋️ Gym API Docs',
  swaggerOptions: {
    persistAuthorization: true,   // el token no se borra al navegar entre endpoints
    docExpansion: 'list',         // muestra los tags cerrados por defecto
    filter: true,                 // barra de búsqueda
  },
}));

// ── Health check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Gym API funcionando! 🚀',
    docs: '/api/docs',
    status: 'ok',
  });
});

// ── Rutas ───────────────────────────────────────────────────────────────────
app.use('/api/auth',        require('./src/routes/auth.routes'));
app.use('/api/users',       require('./src/routes/user.routes'));
app.use('/api/memberships', require('./src/routes/membership.routes'));
app.use('/api/routines',    require('./src/routes/routine.routes'));
app.use('/api/classes',     require('./src/routes/class.routes'));

// ── Error global ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📖 Swagger UI en http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1);
  }
}

startServer();
