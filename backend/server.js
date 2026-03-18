
require('dotenv').config(); // lee .envconst express = require('express');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());            // permite que el frontend haga peticiones desde otra URL
app.use(express.json());    // parsea JSON del body

// Rutas
const empleadosRouter = require('./routes/empleadosRoute');
const tareasRouter = require('./routes/tareas');

app.use('/api/empleados', empleadosRouter);
app.use('/api/tareas', tareasRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});