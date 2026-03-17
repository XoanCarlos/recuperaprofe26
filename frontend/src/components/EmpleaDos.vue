<template>
  <div class="container-fluid">
    <h2 class="mb-3 mt-3 text-center">Gestión de empleados</h2>

    <div class="row g-4">
      <!-- FORMULARIO -->
      <div class="col-lg-4 col-md-5">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            <i class="bi bi-person"></i> Datos del empleado
          </div>
          <div class="card-body">
            <form @submit.prevent="addEmpleado">
              <div class="mb-3">
                <label class="form-label">Apellidos</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="empleado.apellidos"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="empleado.nombre"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Email *</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="empleado.email"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Móvil *</label>
                <input
                  type="text"
                  class="form-control text-center"
                  v-model="empleado.movil"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Puesto</label>
                <select class="form-select" v-model="empleado.puesto">
                  <option value="">Seleccione puesto</option>
                  <option value="rrhh">RRHH</option>
                  <option value="contabilidad">Contabilidad</option>
                  <option value="almacen">Almacén</option>
                  <option value="ventas">Ventas</option>
                </select>
              </div>

              <div class="mb-3 text-center">
                <button class="btn btn-primary btn-sm">
                  {{ empleado.id ? "Actualizar" : "Grabar" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- LISTADO -->
      <div class="col-lg-8 col-md-7">
        <div class="card shadow-sm">
          <div
            class="card-header bg-secondary text-white d-flex justify-content-center"
          >
            <span><i class="bi bi-people"></i> Listado de empleados</span>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-light">
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Apellidos</th>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Puesto</th>
                  <th class="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="emp in empleados" :key="emp.id">
                  <td class="text-center">{{ emp.id }}</td>
                  <td>{{ emp.apellidos }}</td>
                  <td>{{ emp.nombre }}</td>
                  <td class="text-center">{{ emp.email }}</td>
                  <td class="text-center">
                    <span class="badge bg-info text-dark">{{
                      emp.puesto
                    }}</span>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-sm btn-warning me-2"
                      @click="selEmpleado(emp)"
                    >
                      <i class="bi bi-pen"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="delEmpleado(emp.id)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";

const empleados = ref([]);
let contadorId = 1; // Contador para asignar IDs únicos a los empleados

const empleado = ref({
  id: null,
  apellidos: "",
  nombre: "",
  email: "",
  movil: "",
  puesto: "",
});

function getEmpleado() {
  // Por ahora devuelve array local vacío
  empleados.value = [];
}

function addEmpleado() {
  if (!empleado.value.nombre) {
    return alerta("error", "Error", "El nombre es obligatorio");
  }

  if (empleado.value.email && !validarEmail(empleado.value.email)) {
    return alerta("error", "Error", "Email no válido");
  }

  if (empleado.value.movil && !validarMovil(empleado.value.movil)) {
    return alerta("error", "Error", "Número de móvil no válido");
  }

  if (empleado.value.id) {
    // ✏️ EDITAR
    const index = empleados.value.findIndex((e) => e.id === empleado.value.id);

    if (index !== -1) {
      empleados.value[index] = {
        ...empleado.value,
        nombre: capitalizar(empleado.value.nombre),
        apellidos: capitalizar(empleado.value.apellidos),
      };
    }

    alerta("success", "Empleado actualizado", "");
  } else {
    // ➕ CREAR
    const nuevo = {
      ...empleado.value,
      id: contadorId++,
      nombre: capitalizar(empleado.value.nombre),
      apellidos: capitalizar(empleado.value.apellidos),
    };

    empleados.value.push(nuevo);

    alerta("success", "Empleado guardado", "");
  }

  limpiarFormulario();
}

function selEmpleado(emp) {
  empleado.value = { ...emp };
}

function delEmpleado(id) {
  alerta("warning", "¿Desea eliminar este empleado?", "").then((result) => {
    if (result.isConfirmed) {
      empleados.value = empleados.value.filter((e) => e.id !== id);
    }
  });
}

function limpiarFormulario() {
  empleado.value = {
    id: null,
    apellidos: "",
    nombre: "",
    email: "",
    movil: "",
    puesto: "",
  };
}

onMounted(() => {
  getEmpleado();
});
/// funcionnes para mostrar alertas con SweetAlert2
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarMovil(movil) {
  const re = /^[67]\d{8}$/;
  return re.test(movil);
}

function capitalizar(str) {
  if (!str) return "";
  return str
    .split(" ") // separa en palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // capitaliza cada palabra
    .join(" "); // vuelve a unir con espacios
}
/**
 * Muestra un SweetAlert
 * @param {string} tipo - 'success', 'error', 'warning', 'info'
 * @param {string} titulo - Título del aviso
 * @param {string} texto - Mensaje
 */
function alerta(tipo, titulo, texto) {
  Swal.fire({
    icon: tipo,
    title: titulo,
    text: texto,
    timer: tipo === 'success' ? 1500 : undefined,
    showConfirmButton: tipo !== 'success'
  });
}
</script>
