import axios from "axios";

// Configuración de Axios directamente aquí
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // lee del .env
  timeout: 5000
});

// GET todos los empleados
export const getEmpleados = async () => {
  const res = await api.get("/empleados");
  return res.data;
};

// POST nuevo empleado
export const addEmpleado = async (empleado) => {
  const res = await api.post("/empleados", empleado);
  return res.data;
};

// PUT actualizar empleado
export const updateEmpleado = async (empleado) => {
  const res = await api.put(`/empleados/${empleado.id}`, empleado);
  return res.data;
};

// DELETE empleado
export const deleteEmpleado = async (id) => {
  const res = await api.delete(`/empleados/${id}`);
  return res.data;
};