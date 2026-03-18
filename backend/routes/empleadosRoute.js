const express = require('express');
const router = express.Router();


// GET todos
router.get('/', (req, res) => {
  res.json(empleados);
});

// POST nuevo
router.post('/', (req, res) => {
  const nuevo = { id: contadorId++, ...req.body };
  empleados.push(nuevo);
  res.json(nuevo);
});

// PUT actualizar
router.put('/:id', (req, res) => {
  const index = empleados.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    empleados[index] = { id: empleados[index].id, ...req.body };
    return res.json(empleados[index]);
  }
  res.status(404).json({ error: 'Empleado no encontrado' });
});

// DELETE
router.delete('/:id', (req, res) => {
  empleados = empleados.filter(e => e.id != req.params.id);
  res.json({ success: true });
});

module.exports = router;